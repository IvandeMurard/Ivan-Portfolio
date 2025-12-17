// components/QuoteBlock.tsx
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { QuoteBlockProps } from '@/types/casestudy';

export const QuoteBlock: React.FC<QuoteBlockProps> = ({ 
  quote, 
  author, 
  role, 
  source, 
  sourceUrl,
  authorImage,
  companyLogo
}) => (
  <div className="my-16 py-12 px-8 md:px-12 bg-background">
    <blockquote className="text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-8 max-w-4xl">
      "{quote}"
    </blockquote>
    <div className="flex items-center gap-4">
      {authorImage && (
        <img 
          src={authorImage} 
          alt={author}
          className="w-16 h-16 rounded-full object-cover border-2 border-border"
        />
      )}
      <div className="flex-1">
        <p className="text-lg font-semibold text-foreground">{author}</p>
        {role && <p className="text-sm text-muted-foreground">{role}</p>}
        {source && (
          <p className="text-sm text-muted-foreground mt-1">
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-contact hover:underline inline-flex items-center gap-1"
              >
                {source}
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              source
            )}
          </p>
        )}
      </div>
      {companyLogo && (
        <img 
          src={companyLogo} 
          alt="Company logo"
          className="h-8 object-contain opacity-60"
        />
      )}
    </div>
  </div>
);
