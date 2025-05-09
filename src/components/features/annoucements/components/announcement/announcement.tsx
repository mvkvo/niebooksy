'use client';

import './announcement.scss';

import Image from 'next/image';
import placeholder from '@/assets/placeholder.png';
import { FaInstagramSquare, FaFacebook } from 'react-icons/fa';
import { Tag } from '../tag';
import { AnnouncementProps } from '@/types/announcements';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Announcement = (announcement: AnnouncementProps) => {
  return (
    <div className="announcement">
      <>
        <div className="announcement__image">
          <Image src={placeholder} alt="hero img" />
        </div>
        <div className="announcement__content">
          <Tag name={announcement.category_name} />
          <h2 className="announcement__content__owner-name">
            {announcement.owner.name}
          </h2>
          <div className="announcement__content__description">
            {announcement.content}
          </div>
          <div className="announcement__content__links">
            <div className="announcement__content__links--socials">
              {announcement.owner.instagram_url && (
                <Link href={announcement.owner.instagram_url}>
                  <FaInstagramSquare />
                </Link>
              )}
              {announcement.owner.facebook_url && (
                <Link href={announcement.owner.facebook_url}>
                  <FaFacebook />
                </Link>
              )}
            </div>
            <div className="announcement__content__links--more">
              <Button>more</Button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
