'use client';

import { useActionState, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignState } from '@/types/signup';
import { validateLogin } from '@actions/signin';
import { Container } from '@/components/layouts/container';

export const LoginForm = () => {
  const [state, formAction, pending] = useActionState<SignState, FormData>(
    validateLogin,
    undefined
  );
  const [form, setForm] = useState({
    email: 'user@user.com',
    password: 'User1234!',
  });

  const params = useSearchParams();
  const errorCode = params.get('error') ?? '';
  const messages: Record<string, string> = {
    CredentialsSignin: 'Nieprawidłowy e-mail lub hasło.',
    Default: 'Wystąpił nieoczekiwany błąd.',
  };
  const error = errorCode ? messages[errorCode] || messages.Default : null;

  useEffect(() => {
    if (state?.success) {
      signIn('credentials', {
        email: form.email,
        password: form.password,
        callbackUrl: '/dashboard',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <Container>
      <div
        className={classNames('form', {
          'form--error': error,
        })}
      >
        {error && <div className="form__result">{error}</div>}
        <form action={formAction}>
          <div className="form__fields">
            <Input
              id="email"
              label="Email"
              name="email"
              autocomplete="email"
              errorMessage={state?.errors?.email}
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.currentTarget.value })
              }
            />
            <Input
              id="password"
              label="Hasło"
              name="password"
              inputType="password"
              autocomplete="current-password"
              errorMessage={state?.errors?.password}
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.currentTarget.value })
              }
            />
            <Button disabled={pending} type="submit">
              {pending ? 'Logowanie...' : 'Zaloguj się'}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default LoginForm;
