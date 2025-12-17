// types.ts - Type definitions for F&B Agent Case Study
import React from 'react';

export interface TooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
}

export interface QuoteBlockProps {
  quote: string;
  author: string;
  role?: string;
  source?: string;
  sourceUrl?: string;
  authorImage?: string;
  companyLogo?: string;
}

export interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  number?: string;
}

export interface Challenge {
  title: string;
  issue: string;
  learning: string;
  fix: string;
}

export interface Decision {
  number: string;
  title: string;
  rationale: string;
  tradeoff: string;
}

export interface Principle {
  number: string;
  title: string;
  content: string;
  why: string;
}

export interface EvolutionStep {
  title: string;
  desc: string;
}

export interface TimelinePhase {
  period: string;
  title: string;
  goal: string;
  deliverables: string[];
  status?: 'completed' | 'in-progress' | 'planned';
  currentStage?: string;
}
