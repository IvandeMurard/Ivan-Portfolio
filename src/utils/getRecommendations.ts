import { BaseItem } from "@/data/inspirationsToolsMerged";

export type CategoryType = "communities" | "inspirations" | "resources" | "tools";

export interface ItemWithCategory extends BaseItem {
  category: CategoryType;
}

/**
 * Calcule un score de similarité basé sur les tags communs
 */
function calculateTagSimilarity(tags1: string[] = [], tags2: string[] = []): number {
  if (tags1.length === 0 || tags2.length === 0) return 0;
  
  const normalized1 = tags1.map(t => t.toLowerCase().trim());
  const normalized2 = tags2.map(t => t.toLowerCase().trim());
  
  const commonTags = normalized1.filter(tag => normalized2.includes(tag));
  const totalTags = new Set([...normalized1, ...normalized2]).size;
  
  return commonTags.length / totalTags;
}

/**
 * Trouve les recommandations pour un item donné
 * @param currentItem - L'item actuel
 * @param currentCategory - La catégorie actuelle
 * @param allItems - Tous les items de toutes les catégories avec leur catégorie
 * @param maxResults - Nombre maximum de recommandations (défaut: 3)
 */
export function getRecommendations(
  currentItem: BaseItem,
  currentCategory: CategoryType,
  allItems: ItemWithCategory[],
  maxResults: number = 3
): ItemWithCategory[] {
  // Filtrer pour exclure l'item actuel
  const candidates = allItems.filter(item => item.id !== currentItem.id);
  
  // Calculer un score pour chaque candidat
  const scored = candidates.map(item => {
    const tagScore = calculateTagSimilarity(currentItem.tags || [], item.tags || []);
    
    // Bonus si même catégorie (0.1), mais on permet aussi cross-category
    const categoryBonus = item.category === currentCategory ? 0.1 : 0;
    
    // Score final = similarité tags + bonus catégorie
    const finalScore = tagScore + categoryBonus;
    
    return { item, score: finalScore };
  });
  
  // Trier par score décroissant et prendre les meilleurs
  const recommendations = scored
    .filter(({ score }) => score > 0) // Au moins un tag commun
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(({ item }) => item);
  
  return recommendations;
}

