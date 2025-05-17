import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/features/auth/login-form';

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect('/dashboard');

  return (
    <div>
      <LoginForm />
    </div>
  );
}
