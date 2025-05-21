'use client';

import './my-events.scss';
import { Button } from '@/components/ui/button';
import { DashboardEventsProps } from '../../models';
import { Typography } from '@/components/ui/typography';

export const MyEvents = ({ events }: DashboardEventsProps) => {
  console.log('events', events);
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <Typography tag="h2" variant="headline">
            {event.title}
          </Typography>
          <Typography tag="p" variant="body">
            {event.content}
          </Typography>
          <Button href={`/event/${event.slug}`} hasArrow>
            more
          </Button>
        </div>
      ))}
    </div>
  );
};
