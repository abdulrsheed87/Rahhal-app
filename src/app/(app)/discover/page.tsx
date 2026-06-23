"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import PlaceCard from "@/components/features/PlaceCard";

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

const CATEGORIES = ["All", "Adventure", "History", "Nature", "Culture", "Shopping"];

export default function DiscoverPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "All") params.set("category", category);

    const res = await fetch(`/api/places?${params}`);
    const data = await res.json();
    setPlaces(data);
    setLoading(false);
  }, [search, category]);

  useEffect(() => {
    const timer = setTimeout(fetchPlaces, 300);
    return () => clearTimeout(timer);
  }, [fetchPlaces]);

  async function toggleFavorite(placeId: string, isFavorited: boolean) {
    if (isFavorited) {
      await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId }),
      });
    } else {
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeId }),
      });
    }

    setPlaces((prev) =>
      prev.map((p) => (p.id === placeId ? { ...p, isFavorited: !isFavorited } : p))
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Discover Places</h1>
        <p className="text-gray-500 text-sm mt-1">Explore destinations around the world</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, city, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal size={16} className="text-gray-400 hidden sm:block" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
                category === cat
                  ? "bg-teal-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-teal-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-72 animate-pulse" />
          ))}
        </div>
      ) : places.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-5xl mb-4">🌍</span>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No places found</h2>
          <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {places.map((place) => (
            <PlaceCard
              key={place.id}
              {...place}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
