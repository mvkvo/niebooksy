import { Event } from '@/types/event';
import { sql } from '@vercel/postgres';

export async function getAllEvents() {
  const response = await sql`
      SELECT events.id, events.user_id, events.title, events.content, events.created_at, events.category_id, events.slug, users.username, users.name, users.surname, users.facebook, users.instagram, categories.category_name 
      FROM events 
      JOIN users ON events.user_id = users.id
      JOIN categories ON events.category_id = categories.id`;

  const events = response.rows.map((row) => ({
    id: row.id,
    owner: {
      username: row.username,
      name: row.name,
      surname: row.surname,
      facebook_url: row.facebook,
      instagram_url: row.instagram,
    },
    title: row.title,
    content: row.content,
    category: row.category_name,
    slug: row.slug,
    created_at: row.created_at.toLocaleString('pl-PL'),
  }));

  return events;
}

export async function getEventsByUserId(user_id: string): Promise<Event[]> {
  const response = await sql`SELECT * FROM events 
  JOIN categories ON events.category_id = categories.id
  WHERE user_id = ${user_id}`;
  const rows = response.rows;

  return rows.map((event) => {
    return {
      id: event.id,
      title: event.title,
      content: event.content,
      created_at: event.created_at.toLocaleString('pl-PL'),
      category: event.category_name,
      slug: event.slug,
    };
  });
  /*   const response = await sql`
      SELECT events.id, events.user_id, events.title, events.content, events.created_at, events.category_id, events.slug, users.name, users.surname, users.facebook, users.instagram, categories.category_name 
      FROM events 
      JOIN users ON events.user_id = users.id
      JOIN categories ON events.category_id = categories.id
      WHERE user_id = ${user_id}`;

  const row = response.rows[0];

  const event: Event = {
    id: row.id,
    owner: {
      name: row.name,
      surname: row.surname,
      facebook_url: row.facebook,
      instagram_url: row.instagram,
    },
    title: row.title,
    content: row.content,
    created_at: row.created_at.toLocaleString('pl-PL'),
    category: row.category_name,
    slug: row.slug,
  };

  return event; */
}

export async function getEventBySlug(slug: string) {
  const response = await sql`
      SELECT events.id, events.user_id, events.title, events.content, events.created_at, events.category_id, events.slug, users.username, users.name, users.surname, users.facebook, users.instagram, categories.category_name 
      FROM events 
      JOIN users ON events.user_id = users.id
      JOIN categories ON events.category_id = categories.id
      WHERE slug = ${slug}`;

  const row = response.rows[0];
  if (!row) return null;

  return {
    id: row.id,
    owner: {
      username: row.username,
      name: row.name,
      surname: row.surname,
      facebook_url: row.facebook,
      instagram_url: row.instagram,
    },
    title: row.title,
    content: row.content,
    category: row.category_name,
    slug: row.slug,
    created_at: row.created_at.toLocaleString('pl-PL'),
  };
}
