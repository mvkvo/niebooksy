import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { format } from "date-fns";

export async function POST(request: Request) {
  try {
    const { user_id, title, content } = await request.json();
    const now = new Date();
    const created_at = format(now, "yyyy-MM-dd");

    const response =
      await sql`INSERT INTO announcements (user_id, title, content, created_at) VALUES (${user_id}, ${title}, ${content}, ${created_at})`;
    console.log(response);
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}

export async function GET() {
  try {
    const response = await sql`
      SELECT * FROM announcements`;
    return NextResponse.json(response.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
