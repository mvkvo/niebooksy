import { CategoryProps } from '@/types/category';
import { sql } from '@vercel/postgres';

export async function getAllCategories(): Promise<CategoryProps[]> {
  const response = await sql`SELECT * FROM categories`;
  return response.rows as CategoryProps[];
}

export async function getCategoryById(id: string): Promise<CategoryProps> {
  const response = await sql`SELECT * FROM categories WHERE id = ${id}`;
  return response.rows[0] as CategoryProps;
}
