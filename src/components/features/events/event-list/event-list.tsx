'use client';

import './event-list.scss';
import { EventListItem } from './event-list-item';
import { EventListProps } from './models';

export const EventList = ({ events }: EventListProps) => {
  return (
    <div className="event-list">
      {events.map((event) => (
        <EventListItem key={event.id} {...event} />
      ))}
    </div>
  );
};
