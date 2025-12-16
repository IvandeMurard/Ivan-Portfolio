import { InlineExpand } from "@/components/InlineExpand";
import { useLightAudio } from "@/hooks/useLightAudio";
import { Play, Pause, ExternalLink } from "lucide-react";
import { BaseItem } from "@/data/inspirationsToolsMerged";
import { CategoryType, ItemWithCategory, getRecommendations } from "@/utils/getRecommendations";
import { RecommendationCard } from "./RecommendationCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";

type Media = {
  type?: "audio" | "video";
  src?: string;
  preview?: string;
  durationSec?: number;
};

type Props = {
  id: string;
  title: string;
  subtitle?: string;
  logo?: string;
  excerpt?: string;
  comment?: string;
  link?: string;
  media?: Media;
  tags?: string[];
  open: boolean;
  onToggle: (id: string) => void;
  // Recommandations props
  allItems?: ItemWithCategory[];
  currentCategory?: CategoryType;
  onRecommendationClick?: (itemId: string) => void;
};

export function ZoomContextCard({
  id,
  title,
  subtitle,
  logo,
  excerpt,
  comment,
  link,
  media,
  tags,
  open,
  onToggle,
  allItems = [],
  currentCategory,
  onRecommendationClick,
}: Props) {
  const { currentId, isPlaying, play, stop } = useLightAudio();
  const { language } = useLanguage();
  const playingThis = currentId === id && isPlaying;
  const ariaId = `zc-${id}`;

  // Calculer les recommandations
  const recommendations = useMemo(() => {
    if (!allItems.length || !currentCategory) return [];
    
    const currentItem: BaseItem = {
      id,
      title,
      subtitle,
      logo,
      excerpt,
      comment,
      link,
      media,
      tags,
    };
    
    return getRecommendations(currentItem, currentCategory, allItems, 3);
  }, [id, title, subtitle, logo, excerpt, comment, link, media, tags, allItems, currentCategory]);

  return (
    <div className="py-4">
      <button
        id={ariaId}
        className="w-full text-left flex items-start gap-3 group cursor-pointer"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        aria-controls={`${ariaId}-panel`}
      >
        {logo ? (
          <img
            src={logo}
            alt=""
            className="w-9 h-9 rounded bg-muted object-contain flex-shrink-0"
          />
        ) : null}

        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:underline underline-offset-4">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {excerpt && (
            <p className="text-sm text-muted-foreground mt-1">{excerpt}</p>
          )}
        </div>
      </button>

      <InlineExpand open={open} ariaId={ariaId} className="overflow-hidden">
        <div id={`${ariaId}-panel`} className="space-y-3 pt-3">
          {comment && (
            <p className="text-sm italic text-muted-foreground/90">“{comment}”</p>
          )}

          {/* Media (audio prioritaire, lecture manuelle) */}
          {media?.type === "audio" && media.src && (
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playingThis ? stop() : play(id, media.src!);
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition"
                aria-label={playingThis ? "Pause audio" : "Play audio"}
              >
                {playingThis ? <Pause size={16} /> : <Play size={16} />}
                <span className="text-sm">
                  {playingThis ? "Pause" : "Play"}
                </span>
              </button>
              {typeof media.durationSec === "number" && (
                <span className="text-xs text-muted-foreground">
                  ~{Math.round(media.durationSec)}s
                </span>
              )}
            </div>
          )}

          {/* Tags */}
          {tags?.length ? (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 rounded-full border text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {/* Lien externe */}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Open resource <ExternalLink size={14} />
            </a>
          )}

          {/* Recommandations */}
          {recommendations.length > 0 && onRecommendationClick && (
            <div className="pt-4 mt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                You might also like
              </h4>
              <div className="space-y-2">
                {recommendations.map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    item={rec}
                    category={rec.category}
                    onClick={() => onRecommendationClick(rec.id)}
                    language={language}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </InlineExpand>
    </div>
  );
}

export default ZoomContextCard;
