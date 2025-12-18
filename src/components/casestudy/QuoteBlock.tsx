// components/QuoteBlock.tsx
import React from 'react';
import { QuoteBlockProps } from '@/types/casestudy';
export const QuoteBlock: React.FC<QuoteBlockProps> = ({
  quote,
  author,
  role,
  source,
  sourceUrl,
  authorImage,
  companyLogo
}) => <div className="my-10">
    <blockquote className="text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-8 max-w-4xl">
      "{quote}"
    </blockquote>
    <div className="flex items-center gap-4">
      {authorImage && <img src={authorImage} alt={author} className="w-16 h-16 rounded-full object-cover border-2 border-border" />}
      <div className="flex-1">
        <p className="text-lg font-semibold text-foreground">{author}</p>
        {role && <p className="text-sm text-muted-foreground">{role}</p>}
        {source}
      </div>
      {companyLogo && <img src={companyLogo} alt="Company logo" className="h-8 object-contain opacity-60" />}
    </div>
  </div>;