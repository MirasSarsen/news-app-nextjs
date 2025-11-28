'use client';
import React, { forwardRef } from 'react';
import { SafeImage } from '@/shared/ui/packages/web/src/shared/ui/SafeImage';
import type { NewsItem } from '../../../entities/news/types';

interface NewsCardProps {
  item: NewsItem;
  isFavorite?: boolean;
  toggleFavorite?: (article: NewsItem) => void;
  isNew?: boolean;
}

export const NewsCard = forwardRef<HTMLDivElement, NewsCardProps>(
  ({ item, isFavorite = false, toggleFavorite, isNew = false }, ref) => {
    return (
     <article
            ref={ref}
            className="
                flex gap-4 p-4 items-start rounded-lg overflow-hidden border 
                bg-white dark:bg-zinc-900 hover:shadow-lg transition-shadow duration-200 cursor-pointer
            "
            >
            <div className="w-[120px] h-[84px] sm:h-[100px] overflow-hidden rounded-md bg-gray-100">
                <SafeImage
                src={item.urlToImage || ''}
                alt={item.title || 'image'}
                className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1">
                <h3 className="text-base font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {item.description}
                </p>

                <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-gray-400">
                    {item.publishedAt ? new Date(item.publishedAt).toLocaleString() : ''}
                </div>

                {toggleFavorite && (
                    <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}
                    className={`px-2 py-1 rounded text-sm ${isFavorite ? 'bg-yellow-400 text-black' : 'bg-blue-600 text-white'}`}
                    >
                    {isFavorite ? '★' : '☆'}
                    </button>
                )}
                </div>
            </div>
     </article>
    );
  }
);

NewsCard.displayName = 'NewsCard';
