import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const favorites = await db.favorite.findMany({
    where: { userId: session.user.id },
    include: { place: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(favorites.map((f) => ({ ...f.place, favoriteId: f.id, isFavorited: true })));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { placeId } = await req.json();
  if (!placeId) return NextResponse.json({ error: "Missing placeId" }, { status: 400 });

  const favorite = await db.favorite.create({
    data: { userId: session.user.id, placeId },
  });

  return NextResponse.json(favorite, { status: 201 });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { placeId } = await req.json();
  if (!placeId) return NextResponse.json({ error: "Missing placeId" }, { status: 400 });

  await db.favorite.deleteMany({
    where: { userId: session.user.id, placeId },
  });

  return NextResponse.json({ success: true });
}
