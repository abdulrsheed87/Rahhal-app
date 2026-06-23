"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Heart, Map, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/trips", label: "My Trips", icon: Map },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/favorites", label: "Favorites", icon: Heart },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/trips" className="flex items-center gap-2">
            <span className="text-2xl">✈️</span>
            <span className="text-xl font-bold text-teal-700">Rahhal</span>
          </Link>

          <div className="hidden sm:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith(href)
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/interests"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700"
            >
              <User size={16} />
              <span className="hidden sm:inline">{session?.user?.name?.split(" ")[0]}</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="sm:hidden flex gap-1 pb-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-xs font-medium transition-colors",
                pathname.startsWith(href)
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
