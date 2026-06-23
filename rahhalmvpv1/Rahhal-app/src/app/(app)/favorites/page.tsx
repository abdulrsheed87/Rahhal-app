"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import PlaceCard from "@/components/features/PlaceCard";
import Button from "@/components/ui/Button";

interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  country: string;
  imageUrl: string;
  rating: number;
  tags: string;
  isFavorited: boolean;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/favorites")
      .then((r) => r.json())
      .then(setFavorites)
      .finally(() => setLoading(false));
  }, []);

  async function handleRemove(placeId: string) {
    await fetch("/api/favorites", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placeId }),
    });
    setFavorites((prev) => prev.filter((p) => p.id !== placeId));
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Favorites</h1>
        <p className="text-gray-500 text-sm mt-1">
          {favorites.length > 0
            ? `${favorites.length} saved ${favorites.length === 1 ? "place" : "places"}`
            : "Places you've saved will appear here"}
        </p>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-72 animate-pulse" />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-5">
            <Heart size={32} className="text-red-300" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">
            Tap the heart on any place in Discover to save it here.
          </p>
          <Link href="/discover">
            <Button>Explore places</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map((place) => (
            <PlaceCard
              key={place.id}
              {...place}
              onToggleFavorite={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
