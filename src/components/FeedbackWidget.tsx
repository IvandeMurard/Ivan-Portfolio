import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle } from "lucide-react";

type Provider =
  | { type: "form"; url: string }
  | { type: "json"; url: string; headers?: Record<string, string> };

type NudgeOpts = {
  enabled?: boolean;
  delayMs?: number;
  scrollPct?: number;
  exitIntent?: boolean;
};

type FeedbackWidgetProps = {
  provider: Provider;
  nudge?: NudgeOpts;
  storageKeys?: {
    shown?: string;
    submitted?: string;
    exitShown?: string;
  };
  includeMeta?: boolean;
  className?: string;
};

const REACTIONS = [
  { emoji: "😕", key: "negative" },
  { emoji: "😐", key: "neutral" },
  { emoji: "🙂", key: "positive" },
  { emoji: "😍", key: "love" },
] as const;

type ReactionKey = (typeof REACTIONS)[number]["key"];

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  provider,
  nudge = { enabled: true, delayMs: 25000, scrollPct: 0.8, exitIntent: true },
  storageKeys = { shown: "fb_nudge_shown", submitted: "fb_submitted", exitShown: "fb_exit_shown" },
  includeMeta = true,
  className,
}) => {
  const { isFrench } = useLanguage();

  const t = {
    modalTitle: isFrench ? "Comment trouvez-vous ce portfolio ?" : "How's your experience so far?",
    submitLabel: isFrench ? "Envoyer" : "Send",
    sendingLabel: isFrench ? "Envoi…" : "Sending…",
    successMessage: isFrench ? "Merci beaucoup ! 🎉" : "Thank you so much! 🎉",
    successSub: isFrench ? "Votre retour compte énormément." : "Your feedback means a lot.",
    nudgeText: isFrench ? "Une idée pour améliorer ce portfolio ?" : "Have an idea to help improve this portfolio?",
    nudgeButton: isFrench ? "Donner mon avis" : "Share feedback",
    closeLabel: isFrench ? "Fermer" : "Close",
    addContact: isFrench ? "Ajouter vos coordonnées (optionnel)" : "Add your contact info (optional)",
    namePlaceholder: isFrench ? "Nom" : "Name",
    emailPlaceholder: isFrench ? "Email" : "Email",
    writeDirectly: isFrench ? "ou écrire directement" : "or write directly",
    tooltipLabel: isFrench ? "Donner un avis" : "Give feedback",
  };

  const placeholders: Record<ReactionKey, { fr: string; en: string }> = {
    negative: { fr: "Qu'est-ce qui pourrait être amélioré ?", en: "What could be improved?" },
    neutral: { fr: "Un détail à partager ?", en: "Anything to share?" },
    positive: { fr: "Qu'est-ce qui vous a plu ?", en: "What did you like?" },
    love: { fr: "Qu'est-ce qui vous a le plus marqué ?", en: "What stood out the most?" },
  };

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reaction, setReaction] = useState<ReactionKey | null>(null);
  const [showTextarea, setShowTextarea] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasPulsed, setHasPulsed] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isDark, setIsDark] = useState(() => {
    const explicit = document.documentElement.classList.contains("dark");
    const prefers = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return explicit || prefers;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Pulse animation after 30s (once)
  useEffect(() => {
    if (hasPulsed) return;
    const timer = setTimeout(() => setHasPulsed(true), 30000);
    return () => clearTimeout(timer);
  }, [hasPulsed]);

  // Nudge logic
  useEffect(() => {
    if (!nudge?.enabled) return;
    if (localStorage.getItem(storageKeys.shown!) || localStorage.getItem(storageKeys.submitted!)) return;

    const showNudge = () => {
      if (!localStorage.getItem(storageKeys.shown!) && !localStorage.getItem(storageKeys.submitted!)) {
        setNudgeVisible(true);
        localStorage.setItem(storageKeys.shown!, "1");
      }
    };

    const timer = setTimeout(showNudge, nudge?.delayMs ?? 25000);
    const onScroll = () => {
      const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrolled > (nudge?.scrollPct ?? 0.8)) {
        showNudge();
        clearTimeout(timer);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [nudge, storageKeys]);

  // Exit-intent
  useEffect(() => {
    if (!nudge?.exitIntent) return;
    if (localStorage.getItem(storageKeys.exitShown!) || localStorage.getItem(storageKeys.submitted!)) return;
    let hasTriggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setTimeout(() => {
          if (!hasTriggered && !open) {
            hasTriggered = true;
            setOpen(true);
            setNudgeVisible(false);
            localStorage.setItem(storageKeys.exitShown!, "1");
          }
        }, 300);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [nudge, storageKeys, open]);

  // Focus & escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset state on close
      if (!success) {
        setReaction(null);
        setShowTextarea(false);
        setShowContact(false);
      }
    }
  }, [open, success]);

  // Focus textarea when it appears
  useEffect(() => {
    if (showTextarea) setTimeout(() => textareaRef.current?.focus(), 100);
  }, [showTextarea]);

  const handleReactionClick = (key: ReactionKey) => {
    setReaction(key);
    setShowTextarea(true);
  };

  const getPlaceholder = () => {
    if (!reaction) return isFrench ? "Votre retour..." : "Your feedback...";
    return isFrench ? placeholders[reaction].fr : placeholders[reaction].en;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (fd.get("_human_check")) return;

    // Add reaction to payload
    if (reaction) fd.set("reaction", reaction);

    if (includeMeta) {
      fd.set("page", `${location.pathname}${location.search}`);
      fd.set("lang", navigator.language || "en");
      fd.set("theme", isDark ? "dark" : "light");
      fd.set("ua", navigator.userAgent || "");
    }

    try {
      setLoading(true);
      if (provider.type === "form") {
        const r = await fetch(provider.url, { method: "POST", body: fd, headers: { Accept: "application/json" } });
        if (!r.ok) throw new Error(`Form submit failed: ${r.status}`);
      } else {
        const payload: Record<string, any> = {};
        fd.forEach((v, k) => (payload[k] = v));
        const r = await fetch(provider.url, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(provider.headers || {}) },
          body: JSON.stringify(payload),
        });
        if (!r.ok) throw new Error(`JSON submit failed: ${r.status}`);
      }
      setSuccess(true);
      localStorage.setItem(storageKeys.submitted!, "1");
      setTimeout(() => { setOpen(false); setSuccess(false); }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // --- Shared input style helper
  const inputStyle = (isDark: boolean): React.CSSProperties => ({
    width: "100%",
    border: isDark ? "1px solid rgba(148,163,184,0.2)" : "1px solid rgba(203,213,225,0.5)",
    borderRadius: 10,
    padding: 12,
    font: "400 14px/1.5 system-ui",
    background: isDark ? "rgba(30,41,59,0.5)" : "rgba(248,250,252,0.8)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: isDark ? "#f1f5f9" : "#0f172a",
    transition: "all 0.2s ease",
    outline: "2px solid transparent",
    outlineOffset: "2px",
  });

  return (
    <>
      {/* Floating CTA — icon only with tooltip */}
      <div
        style={{ position: "fixed", right: 16, bottom: 80, zIndex: 40 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && (
          <div
            style={{
              position: "absolute",
              right: "calc(100% + 8px)",
              top: "50%",
              transform: "translateY(-50%)",
              whiteSpace: "nowrap",
              background: isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.95)",
              color: isDark ? "#f1f5f9" : "#0f172a",
              padding: "6px 12px",
              borderRadius: 8,
              font: "500 13px/1.2 system-ui",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
              pointerEvents: "none",
            }}
          >
            {t.tooltipLabel}
          </div>
        )}
        <button
          aria-label={t.tooltipLabel}
          onClick={() => setOpen(true)}
          className={className}
          style={{
            display: "grid",
            placeItems: "center",
            width: 48,
            height: 48,
            border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.15)",
            background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.85)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            color: isDark ? "#f1f5f9" : "#0f172a",
            borderRadius: 999,
            cursor: "pointer",
            boxShadow: isDark
              ? "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
              : "0 6px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            animation: !hasPulsed ? undefined : "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
          }}
        >
          <MessageCircle size={20} />
        </button>
      </div>

      {/* Nudge banner */}
      {nudgeVisible && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            bottom: 12,
            transform: "translateX(-50%)",
            zIndex: 45,
            background: isDark ? "rgba(15,23,42,0.9)" : "rgba(255,255,255,0.95)",
            color: isDark ? "#f1f5f9" : "#0f172a",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.08)",
            borderRadius: 12,
            padding: "10px 14px",
            display: "flex",
            gap: 10,
            alignItems: "center",
            boxShadow: "0 6px 24px rgba(0,0,0,.15)",
            backdropFilter: "blur(20px)",
          }}
        >
          <span style={{ font: "500 14px/1.2 system-ui" }}>{t.nudgeText}</span>
          <button
            onClick={() => { setNudgeVisible(false); setOpen(true); }}
            style={{
              border: 0,
              background: isDark ? "#3b82f6" : "#1e40af",
              color: "#fff",
              padding: "6px 12px",
              borderRadius: 8,
              font: "600 12px/1.2 system-ui",
              cursor: "pointer",
            }}
          >
            {t.nudgeButton}
          </button>
          <button
            aria-label={t.closeLabel}
            onClick={() => setNudgeVisible(false)}
            style={{ border: 0, background: "transparent", fontSize: 16, lineHeight: 1, color: isDark ? "#94a3b8" : "#64748b", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="fb-title"
          onClick={(e) => e.target === dialogRef.current && setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "rgba(0,0,0,.35)",
            backdropFilter: "saturate(120%) blur(3px)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: "min(92vw,480px)",
              border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.4)",
              background: isDark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.88)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              color: isDark ? "#f1f5f9" : "#0f172a",
              borderRadius: 16,
              padding: "24px 20px 20px",
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "0 20px 60px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 id="fb-title" style={{ margin: 0, font: "600 17px/1.3 system-ui", color: isDark ? "#f1f5f9" : "#0f172a" }}>
                {t.modalTitle}
              </h2>
              <button
                aria-label={t.closeLabel}
                onClick={() => setOpen(false)}
                style={{ border: 0, background: "transparent", fontSize: 20, lineHeight: 1, color: isDark ? "#cbd5e1" : "#64748b", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            {!success ? (
              <form onSubmit={handleSubmit} style={{ marginTop: 16, display: "grid", gap: 12 }}>
                {/* Honeypot */}
                <input type="text" name="_human_check" autoComplete="off" tabIndex={-1} style={{ position: "absolute", left: -9999, opacity: 0 }} />

                {/* Reaction bar */}
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                  {REACTIONS.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => handleReactionClick(r.key)}
                      aria-label={r.key}
                      style={{
                        width: 52,
                        height: 52,
                        fontSize: 28,
                        border: reaction === r.key
                          ? `2px solid ${isDark ? "#3b82f6" : "#1e40af"}`
                          : `1px solid ${isDark ? "rgba(148,163,184,0.15)" : "rgba(203,213,225,0.4)"}`,
                        borderRadius: 14,
                        background: reaction === r.key
                          ? (isDark ? "rgba(59,130,246,0.15)" : "rgba(30,64,175,0.08)")
                          : (isDark ? "rgba(30,41,59,0.4)" : "rgba(248,250,252,0.6)"),
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        transform: reaction === r.key ? "scale(1.1)" : "scale(1)",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      {r.emoji}
                    </button>
                  ))}
                </div>

                {/* "Write directly" link if no reaction yet */}
                {!showTextarea && !reaction && (
                  <button
                    type="button"
                    onClick={() => setShowTextarea(true)}
                    style={{
                      border: 0,
                      background: "transparent",
                      color: isDark ? "#94a3b8" : "#64748b",
                      font: "400 13px/1.2 system-ui",
                      cursor: "pointer",
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                      textAlign: "center",
                    }}
                  >
                    {t.writeDirectly}
                  </button>
                )}

                {/* Textarea — shown after reaction or "write directly" */}
                {(showTextarea || reaction) && (
                  <textarea
                    ref={textareaRef}
                    name="feedback"
                    placeholder={getPlaceholder()}
                    rows={4}
                    style={{ ...inputStyle(isDark), resize: "vertical" }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = isDark ? "2px solid #3b82f6" : "2px solid #1e40af";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = "2px solid transparent";
                    }}
                  />
                )}

                {/* Collapsed contact fields */}
                {(showTextarea || reaction) && (
                  <>
                    {!showContact ? (
                      <button
                        type="button"
                        onClick={() => setShowContact(true)}
                        style={{
                          border: 0,
                          background: "transparent",
                          color: isDark ? "#94a3b8" : "#64748b",
                          font: "400 13px/1.2 system-ui",
                          cursor: "pointer",
                          textAlign: "left",
                          textDecoration: "underline",
                          textUnderlineOffset: 3,
                        }}
                      >
                        {t.addContact}
                      </button>
                    ) : (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <input type="text" name="name" placeholder={t.namePlaceholder} style={inputStyle(isDark)} />
                        <input type="email" name="email" placeholder={t.emailPlaceholder} style={inputStyle(isDark)} />
                      </div>
                    )}
                  </>
                )}

                {/* Submit */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                  <button
                    type="submit"
                    disabled={loading || (!reaction && !showTextarea)}
                    style={{
                      border: 0,
                      background: isDark
                        ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
                        : "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                      color: "#ffffff",
                      padding: "10px 22px",
                      borderRadius: 10,
                      font: "600 14px/1.2 system-ui",
                      opacity: loading || (!reaction && !showTextarea) ? 0.5 : 1,
                      cursor: loading || (!reaction && !showTextarea) ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: isDark
                        ? "0 4px 12px rgba(59,130,246,0.4)"
                        : "0 4px 12px rgba(30,58,138,0.35)",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {loading ? t.sendingLabel : t.submitLabel}
                  </button>
                </div>

                {provider.type === "form" && (
                  <>
                    <input type="hidden" name="page" value="" />
                    <input type="hidden" name="lang" value="" />
                    <input type="hidden" name="theme" value="" />
                    <input type="hidden" name="ua" value="" />
                  </>
                )}
              </form>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 0 8px" }}>
                <div style={{ fontSize: 48, marginBottom: 8, animation: "bounce 0.6s ease" }}>🎉</div>
                <p style={{ margin: 0, font: "600 16px/1.4 system-ui", color: isDark ? "#10b981" : "#059669" }}>
                  {t.successMessage}
                </p>
                <p style={{ margin: "6px 0 0", font: "400 14px/1.4 system-ui", color: isDark ? "#94a3b8" : "#64748b" }}>
                  {t.successSub}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keyframe for success animation */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          40% { transform: translateY(-12px); }
          60% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
};
