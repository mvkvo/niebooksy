'use client';

import { Typography } from '@/components/ui/typography';
import { Settings } from './settings/settings';
import { DashboardProps } from './models';

export const Dashboard = ({ user, events }: DashboardProps) => {
  return (
    <>
      <Typography tag="h2" variant="headline" weight="bold">
        Zarządzanie profilem
      </Typography>
      <Settings user={user} events={events} />
    </>
  );
};
