import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [allInterests, userInterests] = await Promise.all([
    db.interest.findMany({ orderBy: { name: "asc" } }),
    db.userInterest.findMany({
      where: { userId: session.user.id },
      select: { interestId: true },
    }),
  ]);

  const selectedIds = new Set(userInterests.map((ui) => ui.interestId));
  return NextResponse.json(
    allInterests.map((i) => ({ ...i, selected: selectedIds.has(i.id) }))
  );
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { interestIds } = await req.json();
  if (!Array.isArray(interestIds)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await db.userInterest.deleteMany({ where: { userId: session.user.id } });

  if (interestIds.length > 0) {
    await db.userInterest.createMany({
      data: interestIds.map((id: string) => ({ userId: session.user.id, interestId: id })),
    });
  }

  return NextResponse.json({ success: true });
}
