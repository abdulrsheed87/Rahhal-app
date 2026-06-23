"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Interest {
  id: string;
  name: string;
  icon: string;
  selected: boolean;
}

export default function InterestsPage() {
  const router = useRouter();
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/interests")
      .then((r) => r.json())
      .then(setInterests)
      .finally(() => setLoading(false));
  }, []);

  function toggle(id: string) {
    setInterests((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );
  }

  async function handleSave() {
    setSaving(true);
    const selectedIds = interests.filter((i) => i.selected).map((i) => i.id);
    await fetch("/api/interests", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interestIds: selectedIds }),
    });
    setSaving(false);
    router.push("/discover");
  }

  const selectedCount = interests.filter((i) => i.selected).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-gray-900">What kind of traveler are you?</h1>
        <p className="text-gray-500 mt-2">
          Select your interests to personalize your discovery experience
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {interests.map((interest) => (
            <button
              key={interest.id}
              onClick={() => toggle(interest.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-150 text-center",
                interest.selected
                  ? "border-teal-500 bg-teal-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-teal-200 hover:bg-gray-50"
              )}
            >
              <span className="text-3xl">{interest.icon}</span>
              <span
                className={cn(
                  "text-xs font-medium leading-tight",
                  interest.selected ? "text-teal-700" : "text-gray-600"
                )}
              >
                {interest.name}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {selectedCount > 0 ? (
            <span className="text-teal-700 font-semibold">{selectedCount} selected</span>
          ) : (
            "Select at least one"
          )}
        </p>
        <Button
          onClick={handleSave}
          loading={saving}
          disabled={selectedCount === 0}
          size="lg"
        >
          {saving ? "Saving..." : "Save & discover"}
        </Button>
      </div>
    </div>
  );
}
