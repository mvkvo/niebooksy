'use client';

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
    <div
      className={classNames('form', {
        'form--error': state?.success === false,
        'form--success': state?.success,
      })}
    >
      {state?.message && <div className="form__result">{state.message}</div>}
      <form action={formAction}>
        <Input
          id="name"
          label="Imię"
          name="name"
          autocomplete="given-name"
          errorMessage={state?.errors?.name}
        />
        <Input
          id="surname"
          label="Nazwisko"
          name="surname"
          autocomplete="family-name"
          errorMessage={state?.errors?.surname}
        />
        <Input
          id="email"
          label="Email"
          name="email"
          autocomplete="email"
          errorMessage={state?.errors?.email}
        />
        <Input
          id="password"
          label="Hasło"
          name="password"
          inputType="password"
          autocomplete="new-password"
          errorMessage={state?.errors?.password}
        />
        <Input
          id="repassword"
          label="Powtórz hasło"
          name="repassword"
          inputType="password"
          autocomplete="new-password"
          errorMessage={state?.errors?.repassword}
        />
        <Button disabled={pending} type="submit">
          Zarejestruj się
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
