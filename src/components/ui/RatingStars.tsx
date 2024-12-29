import React from 'react';
import { Star, StarOff } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: number;
}

export function RatingStars({ rating, size = 5 }: RatingStarsProps) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < rating ? (
            <Star className={`w-${size} h-${size} text-yellow-400 fill-current`} />
          ) : (
            <StarOff className={`w-${size} h-${size} text-gray-300`} />
          )}
        </span>
      ))}
    </div>
  );
}