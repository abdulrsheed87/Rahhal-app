"use client";

import { Heart, Star, MapPin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PlaceCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  country: string;
  imageUrl: string;
  rating: number;
  tags: string;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string, isFavorited: boolean) => void;
}

export default function PlaceCard({
  id,
  name,
  description,
  category,
  city,
  country,
  imageUrl,
  rating,
  tags,
  isFavorited = false,
  onToggleFavorite,
}: PlaceCardProps) {
  const parsedTags: string[] = (() => {
    try {
      return JSON.parse(tags);
    } catch {
      return [];
    }
  })();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <button
          onClick={() => onToggleFavorite?.(id, isFavorited)}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors",
            isFavorited
              ? "bg-red-500 text-white"
              : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-400"
          )}
        >
          <Heart size={16} fill={isFavorited ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
          <Star size={11} fill="currentColor" className="text-yellow-400" />
          {rating.toFixed(1)}
        </div>

        <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs px-2.5 py-1 rounded-full font-medium">
          {category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg leading-tight">{name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1 mb-2">
          <MapPin size={13} />
          {city}, {country}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {parsedTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {parsedTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
