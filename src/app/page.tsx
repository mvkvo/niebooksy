import './main.scss';

import hero_img from '@/assets/hero_img.png';
import Image from 'next/image';

import { SearchBlock } from '@/components/features/search-block';
import { getAllCategories } from '@/lib/db/categories';
import { getAllEvents } from '@/lib/db/events';
import { EventList } from '@/components/features/events';

export default async function Home() {
  const categories = await getAllCategories();
  const events = await getAllEvents();

  return (
    <>
      <Image src={hero_img} alt="hero img" />
      <SearchBlock categories={categories} />
      <EventList events={events} />
    </>
  );
}
