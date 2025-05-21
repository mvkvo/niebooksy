'use client';

import { Container } from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignState } from '@/types/signup';
import { signup } from '@actions/signup';
import classNames from 'classnames';
import { useActionState } from 'react';

export const SignupForm = () => {
  const [state, formAction, pending] = useActionState<SignState, FormData>(
    signup,
    undefined
  );

  return (
    <Container>
      <div
        className={classNames('form', {
          'form--error': state?.success === false,
          'form--success': state?.success,
        })}
      >
        {state?.message && <div className="form__result">{state.message}</div>}
        <form action={formAction}>
          <div className="form__fields">
            <Input
              id="username"
              label="Nazwa użytkownika"
              name="username"
              autocomplete="username"
              defaultValue={state?.values?.username}
              errorMessage={state?.errors?.username}
            />
            <Input
              id="name"
              label="Imię"
              name="name"
              autocomplete="given-name"
              defaultValue={state?.values?.name}
              errorMessage={state?.errors?.name}
            />
            <Input
              id="surname"
              label="Nazwisko"
              name="surname"
              autocomplete="family-name"
              defaultValue={state?.values?.surname}
              errorMessage={state?.errors?.surname}
            />
            <Input
              id="email"
              label="Email"
              name="email"
              autocomplete="email"
              defaultValue={state?.values?.email}
              errorMessage={state?.errors?.email}
            />
            <Input
              id="password"
              label="Hasło"
              name="password"
              inputType="password"
              autocomplete="new-password"
              defaultValue={state?.values?.password}
              errorMessage={state?.errors?.password}
            />
            <Input
              id="repassword"
              label="Powtórz hasło"
              name="repassword"
              inputType="password"
              autocomplete="new-password"
              defaultValue={state?.values?.repassword}
              errorMessage={state?.errors?.repassword}
            />
            <Button disabled={pending} type="submit">
              Zarejestruj się
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default SignupForm;
