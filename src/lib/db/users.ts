import { User } from '@/types/user';
import { sql } from '@vercel/postgres';

export async function getUserById(id: string): Promise<User> {
  const response =
    await sql`SELECT name, surname, profile_picture, email FROM users WHERE id = ${id}`;
  return response.rows[0] as User;
}
