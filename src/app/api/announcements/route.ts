import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { user_id, title, content, category_id } = await request.json();

    const response =
      await sql`INSERT INTO events (user_id, title, content, created_at, category_id) VALUES (${user_id}, ${title}, ${content}, CURRENT_TIMESTAMP, ${category_id}) 
      RETURNING id`;
    const id = response.rows[0].id;

    const slugBase = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const slug = `${id}-${slugBase}`;
    await sql`UPDATE events SET slug = ${slug} WHERE id = ${id}`;

    console.log(response);
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: 'success' });
}
