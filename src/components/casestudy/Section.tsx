// components/Section.tsx
import React, { useState, useEffect } from 'react';
import { SectionProps } from '@/types/casestudy';

export const Section: React.FC<SectionProps> = ({ id, title, children, number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(id);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [id]);

  return (
    <section
      id={id}
      className={`py-16 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {title && (
        <h2 className="text-3xl font-bold text-foreground mb-8">
          {number && <span className="text-primary">{number}. </span>}
          {title}
        </h2>
      )}
      {children}
    </section>
  );
};
