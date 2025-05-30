'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export const LogoutButton = () => (
  <Button onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
    Wyloguj
  </Button>
);
