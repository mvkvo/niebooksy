import { sql } from '@vercel/postgres';

export async function getAllAnnoucements() {
  const response = await sql`
      SELECT announcements.id, announcements.user_id, announcements.title, announcements.content, announcements.created_at, announcements.category_id, users.name, users.surname, users.facebook, users.instagram, categories.category_name 
      FROM announcements 
      JOIN users ON announcements.user_id = users.id
      JOIN categories ON announcements.category_id = categories.id`;

  const announcements = response.rows.map((row) => ({
    id: row.id,
    owner: {
      name: `${row.name} ${row.surname}`,
      facebook_url: row.facebook,
      instagram_url: row.instagram,
    },
    title: row.title,
    content: row.content,
    category_name: row.category_name,
    created_at: row.created_at.toLocaleString('pl-PL'),
  }));

  return announcements;
}

export async function getAnnoucementByUserId(user_id: string) {
  const response = await sql`
      SELECT announcements.id, announcements.user_id, announcements.title, announcements.content, announcements.created_at, announcements.category_id, users.name, users.surname, users.facebook, users.instagram, categories.category_name 
      FROM announcements 
      JOIN users ON announcements.user_id = users.id
      JOIN categories ON announcements.category_id = categories.id
      WHERE user_id = ${user_id}`;

  const row = response.rows[0];

  return {
    id: row.id,
    owner: {
      name: `${row.name} ${row.surname}`,
      facebook_url: row.facebook,
      instagram_url: row.instagram,
    },
    title: row.title,
    content: row.content,
    category_name: row.category_name,
    created_at: row.created_at.toLocaleString('pl-PL'),
  };
}
