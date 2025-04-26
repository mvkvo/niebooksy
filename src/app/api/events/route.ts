import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import getSession from "@/lib/getSession";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const userId = session.user.id;
    const { title, description, start, end } = await request.json();
    const response =
      await sql`INSERT INTO events (user_id, title, description, start, "end", created_at) VALUES (${userId}, ${title}, ${description}, ${start}, ${end}, CURRENT_TIMESTAMP)`;
    console.log(response);
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}

export async function GET() {
  const session = await getSession();
  if (!session || !session.user || !session.user.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  try {
    const response = await sql`
      SELECT * FROM events WHERE user_id = ${userId}`;
    return NextResponse.json(response.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
