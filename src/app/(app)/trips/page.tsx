"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Map } from "lucide-react";
import TripCard from "@/components/features/TripCard";
import Button from "@/components/ui/Button";

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  description?: string | null;
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trips")
      .then((r) => r.json())
      .then(setTrips)
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    await fetch(`/api/trips/${id}`, { method: "DELETE" });
    setTrips((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your upcoming and past adventures</p>
        </div>
        <Link href="/trips/new">
          <Button size="md">
            <Plus size={16} />
            New trip
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 h-44 animate-pulse" />
          ))}
        </div>
      ) : trips.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mb-5">
            <Map size={32} className="text-teal-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">No trips yet</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm">
            Start planning your first adventure — create a trip to get organized.
          </p>
          <Link href="/trips/new">
            <Button>
              <Plus size={16} />
              Create your first trip
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trips.map((trip) => (
            <TripCard key={trip.id} {...trip} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
