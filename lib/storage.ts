'use client';

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

export function toggleFavorite(opportunityId: string): void {
  if (typeof window === 'undefined') return;
  const favorites = getFavorites();
  const index = favorites.indexOf(opportunityId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(opportunityId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export function isFavorite(opportunityId: string): boolean {
  if (typeof window === 'undefined') return false;
  const favorites = getFavorites();
  return favorites.includes(opportunityId);
}

export function getComparisonList(): string[] {
  if (typeof window === 'undefined') return [];
  const comparison = localStorage.getItem('comparison');
  return comparison ? JSON.parse(comparison) : [];
}

export function addToComparison(opportunityId: string): void {
  if (typeof window === 'undefined') return;
  const comparison = getComparisonList();
  if (!comparison.includes(opportunityId) && comparison.length < 4) {
    comparison.push(opportunityId);
    localStorage.setItem('comparison', JSON.stringify(comparison));
  }
}

export function removeFromComparison(opportunityId: string): void {
  if (typeof window === 'undefined') return;
  const comparison = getComparisonList();
  const index = comparison.indexOf(opportunityId);
  if (index > -1) {
    comparison.splice(index, 1);
    localStorage.setItem('comparison', JSON.stringify(comparison));
  }
}

export function clearComparison(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('comparison');
}

