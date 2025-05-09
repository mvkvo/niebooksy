import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, name, surname } = await request.json();
    const hashedPassword = await hash(password, 10);

    const response =
      await sql`INSERT INTO users (email, password, created_at, name, surname) VALUES (${email}, ${hashedPassword}, CURRENT_TIMESTAMP, ${name}, ${surname})`;
    console.log(response);
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: 'success' });
}
