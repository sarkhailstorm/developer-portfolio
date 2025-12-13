import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST() {
  const rows = await sql`
        UPDATE likes
        SET likes_count = likes_count + 1
        WHERE id = 0
        RETURNING likes_count;
    `;

  const likes = rows[0].likes_count;

  return NextResponse.json({ likes });
}

export async function GET() {
  const rows = await sql`
        SELECT likes_count 
        FROM likes
        WHERE id = 0;
    `;

  const likes = rows[0].likes_count;

  return NextResponse.json({ likes });
}
