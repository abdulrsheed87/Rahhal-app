"use client";

import { Calendar, MapPin, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface TripCardProps {
  id: string;
  title: string;
  destination: string;
  startDate: string | Date;
  endDate: string | Date;
  description?: string | null;
  onDelete?: (id: string) => void;
}

export default function TripCard({
  id,
  title,
  destination,
  startDate,
  endDate,
  description,
  onDelete,
}: TripCardProps) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">{title}</h3>
          <div className="flex items-center gap-1.5 text-teal-600 font-medium text-sm mt-1">
            <MapPin size={14} />
            {destination}
          </div>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-500 mt-3 line-clamp-2">{description}</p>
      )}

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Calendar size={14} />
          <span>{formatDate(startDate)}</span>
          <span>→</span>
          <span>{formatDate(endDate)}</span>
        </div>
        <span className="ml-auto text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
          {days} {days === 1 ? "day" : "days"}
        </span>
      </div>
    </div>
  );
}
