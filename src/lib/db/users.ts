import { User } from '@/types/user';
import { sql } from '@vercel/postgres';

export async function getUserById(id: string): Promise<User> {
  const response =
    await sql`SELECT name, surname, profile_picture, email FROM users WHERE id = ${id}`;
  return response.rows[0] as User;
}

export async function getUserByUsername(username: string): Promise<User> {
  const response =
    await sql`SELECT id, name, surname, profile_picture, email FROM users WHERE username = ${username}`;
  return response.rows[0] as User;
}

export async function isEmailTaken(email: string): Promise<boolean> {
  const response = await sql`SELECT id FROM users WHERE email = ${email}`;
  return response.rows.length > 0;
}

export async function isUsernameTaken(username: string): Promise<boolean> {
  const response = await sql`SELECT id FROM users WHERE username = ${username}`;
  return response.rows.length > 0;
}
