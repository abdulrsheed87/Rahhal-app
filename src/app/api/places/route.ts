import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const places = await db.place.findMany({
    where: {
      ...(category && category !== "All" ? { category } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { city: { contains: search } },
              { country: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { rating: "desc" },
    include: {
      favorites: {
        where: { userId: session.user.id },
        select: { id: true },
      },
    },
  });

  return NextResponse.json(
    places.map((p) => ({ ...p, isFavorited: p.favorites.length > 0, favorites: undefined }))
  );
}
