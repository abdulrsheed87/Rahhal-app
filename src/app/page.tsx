import Link from "next/link";
import { Compass, Map, Heart, Star } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Plan Your Trips",
    description: "Organize every journey with destinations, dates, and details — all in one place.",
  },
  {
    icon: Compass,
    title: "Discover Places",
    description: "Explore handpicked destinations filtered to match your personal travel interests.",
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description: "Bookmark the places that excite you and build your personal travel wishlist.",
  },
];

const testimonials = [
  { name: "Sara Al-Harbi", text: "Rahhal made planning my Jordan trip effortless. Found Petra, Wadi Rum, and the Dead Sea all in one app!", rating: 5 },
  { name: "Omar Khalid", text: "Finally a travel app that understands the region. The discover feature is incredible.", rating: 5 },
  { name: "Lina Mansour", text: "Saved so much time planning my Morocco trip. Love the favorites feature!", rating: 5 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <span className="text-xl font-bold text-teal-700">Rahhal</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-teal-600 text-white px-5 py-2 rounded-xl hover:bg-teal-700 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-sm px-4 py-1.5 rounded-full mb-6 backdrop-blur">
              <span>🌍</span>
              <span>Smart travel planning for the modern explorer</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Your next adventure
              <br />
              <span className="text-teal-200">starts here</span>
            </h1>
            <p className="text-lg sm:text-xl text-teal-100 mb-10 max-w-2xl">
              Discover breathtaking destinations, plan personalized trips, and save your favorite places — all tailored to your travel style.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-3.5 rounded-xl hover:bg-teal-50 transition-colors text-base shadow-lg"
              >
                Start planning for free
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-base"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1440 40 1080 0 720 0C360 0 0 40 0 40L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "50+", label: "Destinations" },
              { value: "10K+", label: "Happy travelers" },
              { value: "4.9★", label: "App rating" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-teal-700">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Everything you need to travel better</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Rahhal brings together the tools every traveler needs, without the clutter.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="text-teal-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Loved by travelers</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map(({ name, text, rating }) => (
              <div key={name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <p className="font-semibold text-gray-900 text-sm">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-700 py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to explore the world?</h2>
          <p className="text-teal-200 mb-8 text-lg">Join thousands of travelers planning smarter with Rahhal.</p>
          <Link
            href="/register"
            className="inline-block bg-white text-teal-700 font-bold px-10 py-4 rounded-xl hover:bg-teal-50 transition-colors text-base shadow-lg"
          >
            Create your free account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
        <p>© 2026 Rahhal. Built for explorers everywhere. ✈️</p>
      </footer>
    </div>
  );
}
