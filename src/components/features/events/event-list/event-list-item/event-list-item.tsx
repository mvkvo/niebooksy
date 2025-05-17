'use client';

import './event-list-item.scss';

import Image from 'next/image';
import Link from 'next/link';
import { FaInstagramSquare, FaFacebook } from 'react-icons/fa';
import { Tag } from './tag';
import { EventProps } from '../models';
import { Button } from '@/components/ui/button';

import placeholder from '@/assets/placeholder.png';

export const EventListItem = (event: EventProps) => {
  return (
    <div className="event">
      <>
        <div className="event__image">
          <Image src={placeholder} alt="hero img" />
        </div>
        <div className="event__content">
          <Tag name={event.category_name} />
          <h2 className="event__owner-name">{event.owner.name}</h2>
          <div className="event__description">{event.content}</div>
          <div className="event__links">
            <div className="event__links--socials">
              {event.owner.instagram_url && (
                <Link href={event.owner.instagram_url}>
                  <FaInstagramSquare />
                </Link>
              )}
              {event.owner.facebook_url && (
                <Link href={event.owner.facebook_url}>
                  <FaFacebook />
                </Link>
              )}
            </div>
            <div className="event__links--more">
              <Button href={`event/${event.slug}`} hasArrow>
                more
              </Button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
