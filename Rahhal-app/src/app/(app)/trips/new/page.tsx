"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function NewTripPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (new Date(form.endDate) <= new Date(form.startDate)) {
      setError("End date must be after start date");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create trip");
      return;
    }

    router.push("/trips");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <Link
          href="/trips"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft size={16} />
          Back to trips
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Plan a new trip</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in the details to get started</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Trip title"
            id="title"
            placeholder="Summer in Morocco"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
          />
          <Input
            label="Destination"
            id="destination"
            placeholder="Marrakech, Morocco"
            value={form.destination}
            onChange={(e) => update("destination", e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start date"
              type="date"
              id="startDate"
              value={form.startDate}
              onChange={(e) => update("startDate", e.target.value)}
              required
            />
            <Input
              label="End date"
              type="date"
              id="endDate"
              value={form.endDate}
              onChange={(e) => update("endDate", e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="What are you excited to do on this trip?"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={loading} size="lg">
              Create trip
            </Button>
            <Link href="/trips">
              <Button type="button" variant="secondary" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
