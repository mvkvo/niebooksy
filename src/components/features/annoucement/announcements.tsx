"use client";

import { AnnouncementProps } from "@/types/announcements";
import { useEffect, useState } from "react";

export const Announcements = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then(setAnnouncements);
  }, []);

  return (
    <div>
      <br />
      <h3>Ogłoszenia:</h3>
      <br />
      <div>
        {announcements.map(({ id, title, content, created_at }) => (
          <div key={id}>
            <p>
              <b>title: </b>
              {title}
            </p>
            <div>
              <b>content: </b>
              {content}
            </div>
            <p>
              <b>created at: </b>
              {created_at}
            </p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};
