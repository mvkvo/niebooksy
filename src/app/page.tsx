import './main.scss';

import hero_img from '@/assets/hero_img.png';
import Image from 'next/image';
import { Announcements } from '@/components/features/annoucements';
import { SearchBlock } from '@/components/features/search-block';
import { getAllCategories } from '@/lib/db/categories';
import { getAllAnnoucements } from '@/lib/db/annoucements';

export default async function Home() {
  const categories = await getAllCategories();
  const announcements = await getAllAnnoucements();

  return (
    <>
      <Image src={hero_img} alt="hero img" />
      <SearchBlock categories={categories} />
      <Announcements announcements={announcements} />
    </>
  );
}
