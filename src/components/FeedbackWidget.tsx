import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Provider =
  | { type: "form"; url: string } // ex: Formspree/Getform/Netlify Forms
  | { type: "json"; url: string; headers?: Record<string, string> }; // ex: /api/feedback, Airtable, Notion via webhook

type NudgeOpts = {
  enabled?: boolean;
  delayMs?: number;      // par défaut 25000
  scrollPct?: number;    // par défaut 0.8
  exitIntent?: boolean;  // détection d'exit-intent
};

type FeedbackWidgetProps = {
  provider: Provider;
  buttonLabel?: string;
  modalTitle?: string;
  submitLabel?: string;
  cancelLabel?: string;
  nudge?: NudgeOpts;
  storageKeys?: {
    shown?: string;      // localStorage key pour nudge
    submitted?: string;  // localStorage key pour submit
    exitShown?: string;  // localStorage key pour exit-intent
  };
  includeMeta?: boolean; // ajoute page/lang/theme dans la payload
  className?: string;    // hook styling facultatif
};

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  provider,
  buttonLabel,
  modalTitle,
  submitLabel,
  cancelLabel,
  nudge = { enabled: true, delayMs: 25000, scrollPct: 0.8, exitIntent: true },
  storageKeys = { shown: "fb_nudge_shown", submitted: "fb_submitted", exitShown: "fb_exit_shown" },
  includeMeta = true,
  className
}) => {
  // --- Language
  const { isFrench } = useLanguage();
  
  // --- Translations
  const t = {
    buttonLabel: isFrench ? "✍️ Avis" : "✍️ Feedback",
    modalTitle: isFrench ? "Qu'est-ce qu'on peut améliorer ?" : "Please, share any feedback you may have!",
    feedbackPlaceholder: isFrench ? "Votre retour (libre)..." : "Your feedback...",
    namePlaceholder: isFrench ? "Nom (facultatif)" : "Name (optional)",
    emailPlaceholder: isFrench ? "Email (facultatif)" : "Email (optional)",
    submitLabel: isFrench ? "Envoyer" : "Send",
    cancelLabel: isFrench ? "Annuler" : "Cancel",
    sendingLabel: isFrench ? "Envoi…" : "Sending…",
    successMessage: isFrench ? "Merci pour votre retour !" : "Thanks for your feedback!",
    nudgeText: isFrench ? "Une idée pour améliorer ce portfolio ?" : "Have an idea to help improve this portfolio?",
    nudgeButton: isFrench ? "Laisser un avis" : "Leave feedback",
    closeLabel: isFrench ? "Fermer" : "Close"
  };
  
  // --- State & refs
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [nudgeVisible, setNudgeVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Theme vars (auto dark si data-theme="dark" ou prefers dark)
  const [isDark, setIsDark] = useState(() => {
    const explicit = document.documentElement.classList.contains("dark");
    const prefers = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return explicit || prefers;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // --- Nudge (timer + scroll, 1x/session)
  useEffect(() => {
    if (!nudge?.enabled) return;
    if (localStorage.getItem(storageKeys.shown!) || localStorage.getItem(storageKeys.submitted!)) return;

    const showNudge = () => {
      if (!localStorage.getItem(storageKeys.shown!) && !localStorage.getItem(storageKeys.submitted!)) {
        setNudgeVisible(true);
        localStorage.setItem(storageKeys.shown!, "1");
      }
    };

    const t = setTimeout(showNudge, nudge?.delayMs ?? 25000);

    const onScroll = () => {
      const scrolled = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrolled > (nudge?.scrollPct ?? 0.8)) {
        showNudge();
        clearTimeout(t);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [nudge, storageKeys]);

  // --- Exit-intent detection
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
    
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [nudge, storageKeys, open]);

  // --- Focus management
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => textareaRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // --- Submit handler
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // honeypot
    if (fd.get("_human_check")) return;

    // enrich meta
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
        // Build JSON payload
        const payload: Record<string, any> = {};
        fd.forEach((v, k) => (payload[k] = v));
        const r = await fetch(provider.url, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(provider.headers || {}) },
          body: JSON.stringify(payload)
        });
        if (!r.ok) throw new Error(`JSON submit failed: ${r.status}`);
      }
      setSuccess(true);
      localStorage.setItem(storageKeys.submitted!, "1");
      setTimeout(() => setOpen(false), 1400);
    } catch (err) {
      // on reste silencieux côté UI (console pour debug)
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bouton flottant - positionné au-dessus du scroll-to-top */}
      <button
        aria-controls="fb-modal"
        aria-expanded={open}
        aria-label={buttonLabel || t.buttonLabel}
        onClick={() => setOpen(true)}
        className={className}
        style={{
          position: "fixed",
          right: 16,
          bottom: 80,
          zIndex: 40,
          border: isDark 
            ? "1px solid rgba(255, 255, 255, 0.2)" 
            : "1px solid rgba(0, 0, 0, 0.15)",
          background: isDark 
            ? "rgba(15, 23, 42, 0.6)" 
            : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          color: isDark ? "#f1f5f9" : "#0f172a",
          padding: "12px 18px",
          borderRadius: 999,
          font: "600 14px/1.2 system-ui",
          cursor: "pointer",
          boxShadow: isDark
            ? "0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 6px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
          e.currentTarget.style.boxShadow = isDark
            ? "0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
            : "0 10px 30px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = isDark
            ? "0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            : "0 6px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1)";
        }}
      >
        {buttonLabel || t.buttonLabel}
      </button>

      {/* Nudge bas de page */}
      {nudgeVisible && (
        <div
          id="fb-nudge"
          style={{
            position: "fixed",
            left: "50%",
            bottom: 12,
            transform: "translateX(-50%)",
            zIndex: 45,
            background: "var(--surface,#fff)",
            color: "var(--text,#111)",
            border: "1px solid var(--border,#e5e7eb)",
            borderRadius: 12,
            padding: "10px 12px",
            display: "flex",
            gap: 8,
            alignItems: "center",
            boxShadow: "0 6px 24px rgba(0,0,0,.12)"
          }}
        >
          <span style={{ font: "500 14px/1.2 system-ui" }}>{t.nudgeText}</span>
          <button
            onClick={() => {
              setNudgeVisible(false);
              setOpen(true);
            }}
            style={{
              border: 0,
              background: "var(--accent,#111)",
              color: "#fff",
              padding: "6px 10px",
              borderRadius: 8,
              font: "600 12px/1.2 system-ui"
            }}
          >
            {t.nudgeButton}
          </button>
          <button
            aria-label={t.closeLabel}
            onClick={() => setNudgeVisible(false)}
            style={{ border: 0, background: "transparent", fontSize: 16, lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Modal */}
      {open && (
        <div
          id="fb-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fb-title"
          ref={dialogRef}
          onClick={(e) => e.target === dialogRef.current && setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "rgba(0,0,0,.3)",
            backdropFilter: "saturate(120%) blur(2px)",
            zIndex: 50
          }}
        >
          <div
            style={{
              width: "min(92vw,520px)",
              border: isDark 
                ? "1px solid rgba(255, 255, 255, 0.15)" 
                : "1px solid rgba(255, 255, 255, 0.4)",
              background: isDark 
                ? "rgba(15, 23, 42, 0.85)" 
                : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              color: isDark ? "#f1f5f9" : "#0f172a",
              borderRadius: 16,
              padding: 20,
              boxShadow: isDark
                ? "0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                : "0 20px 60px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <h2 id="fb-title" style={{ 
                margin: 0, 
                font: "600 18px/1.3 system-ui",
                color: isDark ? "#f1f5f9" : "#0f172a"
              }}>
                {modalTitle || t.modalTitle}
              </h2>
              <button
                aria-label={t.closeLabel}
                onClick={() => setOpen(false)}
                style={{ 
                  border: 0, 
                  background: "transparent", 
                  fontSize: 20, 
                  lineHeight: 1,
                  color: isDark ? "#cbd5e1" : "#64748b",
                  cursor: "pointer",
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? "#f1f5f9" : "#0f172a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? "#cbd5e1" : "#64748b";
                }}
              >
                ✕
              </button>
            </div>

            {!success ? (
              <form onSubmit={handleSubmit} style={{ marginTop: 12, display: "grid", gap: 8 }}>
                {/* Honeypot */}
                <input
                  type="text"
                  name="_human_check"
                  autoComplete="off"
                  tabIndex={-1}
                  style={{ position: "absolute", left: -9999, opacity: 0 }}
                />
                <textarea
                  ref={textareaRef}
                  name="feedback"
                  placeholder={t.feedbackPlaceholder}
                  required
                  rows={5}
                  style={{
                    width: "100%",
                    border: isDark 
                      ? "1px solid rgba(148, 163, 184, 0.2)" 
                      : "1px solid rgba(203, 213, 225, 0.5)",
                    borderRadius: 10,
                    padding: 12,
                    font: "400 14px/1.5 system-ui",
                    resize: "vertical",
                    background: isDark 
                      ? "rgba(30, 41, 59, 0.5)" 
                      : "rgba(248, 250, 252, 0.8)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: isDark ? "#f1f5f9" : "#0f172a",
                    transition: "all 0.2s ease",
                    outline: "2px solid transparent",
                    outlineOffset: "2px"
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = isDark 
                      ? "2px solid #3b82f6" 
                      : "2px solid #1e40af";
                    e.currentTarget.style.borderColor = isDark 
                      ? "rgba(59, 130, 246, 0.4)" 
                      : "rgba(30, 64, 175, 0.4)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "2px solid transparent";
                    e.currentTarget.style.borderColor = isDark 
                      ? "rgba(148, 163, 184, 0.2)" 
                      : "rgba(203, 213, 225, 0.5)";
                  }}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <input
                    type="text"
                    name="name"
                    placeholder={t.namePlaceholder}
                    style={{
                      width: "100%",
                      border: isDark 
                        ? "1px solid rgba(148, 163, 184, 0.2)" 
                        : "1px solid rgba(203, 213, 225, 0.5)",
                      borderRadius: 10,
                      padding: 12,
                      font: "400 14px/1.5 system-ui",
                      background: isDark 
                        ? "rgba(30, 41, 59, 0.5)" 
                        : "rgba(248, 250, 252, 0.8)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      transition: "all 0.2s ease",
                      outline: "2px solid transparent",
                      outlineOffset: "2px"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = isDark 
                        ? "2px solid #3b82f6" 
                        : "2px solid #1e40af";
                      e.currentTarget.style.borderColor = isDark 
                        ? "rgba(59, 130, 246, 0.4)" 
                        : "rgba(30, 64, 175, 0.4)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = "2px solid transparent";
                      e.currentTarget.style.borderColor = isDark 
                        ? "rgba(148, 163, 184, 0.2)" 
                        : "rgba(203, 213, 225, 0.5)";
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t.emailPlaceholder}
                    style={{
                      width: "100%",
                      border: isDark 
                        ? "1px solid rgba(148, 163, 184, 0.2)" 
                        : "1px solid rgba(203, 213, 225, 0.5)",
                      borderRadius: 10,
                      padding: 12,
                      font: "400 14px/1.5 system-ui",
                      background: isDark 
                        ? "rgba(30, 41, 59, 0.5)" 
                        : "rgba(248, 250, 252, 0.8)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      color: isDark ? "#f1f5f9" : "#0f172a",
                      transition: "all 0.2s ease",
                      outline: "2px solid transparent",
                      outlineOffset: "2px"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = isDark 
                        ? "2px solid #3b82f6" 
                        : "2px solid #1e40af";
                      e.currentTarget.style.borderColor = isDark 
                        ? "rgba(59, 130, 246, 0.4)" 
                        : "rgba(30, 64, 175, 0.4)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = "2px solid transparent";
                      e.currentTarget.style.borderColor = isDark 
                        ? "rgba(148, 163, 184, 0.2)" 
                        : "rgba(203, 213, 225, 0.5)";
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    style={{
                      border: isDark 
                        ? "1px solid rgba(148, 163, 184, 0.3)" 
                        : "1px solid rgba(203, 213, 225, 0.5)",
                      background: isDark 
                        ? "rgba(51, 65, 85, 0.5)" 
                        : "rgba(255, 255, 255, 0.6)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      padding: "10px 16px",
                      borderRadius: 10,
                      font: "500 14px/1.2 system-ui",
                      color: isDark ? "#cbd5e1" : "#475569",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = isDark 
                        ? "rgba(71, 85, 105, 0.6)" 
                        : "rgba(241, 245, 249, 0.8)";
                      e.currentTarget.style.borderColor = isDark 
                        ? "rgba(148, 163, 184, 0.5)" 
                        : "rgba(148, 163, 184, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = isDark 
                        ? "rgba(51, 65, 85, 0.5)" 
                        : "rgba(255, 255, 255, 0.6)";
                      e.currentTarget.style.borderColor = isDark 
                        ? "rgba(148, 163, 184, 0.3)" 
                        : "rgba(203, 213, 225, 0.5)";
                    }}
                  >
                    {cancelLabel || t.cancelLabel}
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      border: 0,
                      background: isDark 
                        ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" 
                        : "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
                      color: "#ffffff",
                      padding: "10px 20px",
                      borderRadius: 10,
                      font: "600 14px/1.2 system-ui",
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: isDark
                        ? "0 4px 12px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                        : "0 4px 12px rgba(30, 58, 138, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      transform: "translateY(0)"
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = isDark
                          ? "0 6px 20px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                          : "0 6px 20px rgba(30, 58, 138, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = isDark
                        ? "0 4px 12px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
                        : "0 4px 12px rgba(30, 58, 138, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)";
                    }}
                  >
                    {loading ? t.sendingLabel : (submitLabel || t.submitLabel)}
                  </button>
                </div>
                {/* champs meta (provider form) */}
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
              <p style={{ 
                margin: "16px 0 0", 
                font: "500 15px/1.4 system-ui",
                color: isDark ? "#10b981" : "#059669",
                textAlign: "center"
              }}>
                {t.successMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};