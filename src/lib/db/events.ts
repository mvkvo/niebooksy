import { sql } from '@vercel/postgres';

export async function getAllEvents() {
  const response = await sql`
      SELECT events.id, events.user_id, events.title, events.content, events.created_at, events.category_id, events.slug, users.name, users.surname, users.facebook, users.instagram, categories.category_name 
      FROM events 
      JOIN users ON events.user_id = users.id
      JOIN categories ON events.category_id = categories.id`;

  const events = response.rows.map((row) => ({
    id: row.id,
    owner: {
      name: `${row.name} ${row.surname}`,
      facebook_url: row.facebook,
      instagram_url: row.instagram,
    },
    title: row.title,
    content: row.content,
    category_name: row.category_name,
    slug: row.slug,
    created_at: row.created_at.toLocaleString('pl-PL'),
  }));

  return events;
}

export async function getEventByUserId(user_id: string) {
  const response = await sql`
      SELECT events.id, events.user_id, events.title, events.content, events.created_at, events.category_id, events.slug, users.name, users.surname, users.facebook, users.instagram, categories.category_name 
      FROM events 
      JOIN users ON events.user_id = users.id
      JOIN categories ON events.category_id = categories.id
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
    slug: row.slug,
    created_at: row.created_at.toLocaleString('pl-PL'),
  };
}

export async function getEventBySlug(slug: string) {
  const response = await sql`
      SELECT events.id, events.user_id, events.title, events.content, events.created_at, events.category_id, events.slug, users.name, users.surname, users.facebook, users.instagram, categories.category_name 
      FROM events 
      JOIN users ON events.user_id = users.id
      JOIN categories ON events.category_id = categories.id
      WHERE slug = ${slug}`;

  const row = response.rows[0];
  if (!row) return null;

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
    slug: row.slug,
    created_at: row.created_at.toLocaleString('pl-PL'),
  };
}
