'use client';

import { useState, useEffect } from 'react';
import { isFavorite, toggleFavorite } from '@/lib/storage';

interface FavoriteButtonProps {
  opportunityId: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function FavoriteButton({ opportunityId, size = 'md' }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(opportunityId));
  }, [opportunityId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(opportunityId);
    setFavorited(!favorited);
  };

  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full transition-colors ${
        favorited
          ? 'text-red-500 hover:text-red-600'
          : 'text-zinc-400 hover:text-red-500'
      }`}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        fill={favorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        className="w-full h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}

