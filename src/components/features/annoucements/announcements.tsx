'use client';

import './announcements.scss';

import { useEffect } from 'react';
import { Announcement } from './components/announcement/announcement';
import { AnnouncementsProps } from './models';

export const Announcements = ({ announcements }: AnnouncementsProps) => {
  useEffect(() => {}, []);

  return (
    <div className="announcements-block">
      {announcements.map((announcement) => (
        <Announcement key={announcement.id} {...announcement} />
      ))}
    </div>
  );
};
