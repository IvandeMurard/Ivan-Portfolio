// src/data/education.ts
export interface EducationItem {
  year: string;
  title_en: string;
  title_fr: string;
  school: string;
  description_en: string;
  description_fr: string;
}

export const education: EducationItem[] = [
  {
    year: "2017",
    title_en: "Master's in Agri-food Business and Entrepreneurship.",
    title_fr: "Master en Gestion et Entrepreneuriat Agroalimentaire.",
    school: "IHEDREA",
    description_en: "Focus on food and agricultural entrepreneurship and product strategy",
    description_fr: "Focus sur l'entrepreneuriat agroalimentaire et la stratégie produit",
  },
];
