'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignupFormSchema, FormState } from '@/lib/definitions';
import { useActionState } from 'react';

export const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  async function signup(state: FormState, formData: FormData) {
    const name = formData.get('name');
    const surname = formData.get('surname');
    const email = formData.get('email');
    const password = formData.get('password');
    const repassword = formData.get('repassword');

    const validatedFields = SignupFormSchema.safeParse({
      name,
      surname,
      email,
      password,
      repassword,
    });

    if (!validatedFields.success)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, email, password }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Process response here
      console.log('Registration Successful', response);
      alert('Registration Successful');
    } catch (error) {
      console.error('Registration Failed:', error);
      alert('Registration Failed');
    }
  }

  return (
    <form action={action} style={{ width: 300 }}>
      <Input id="name" label="Imię" name="name" />
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <Input id="surname" label="Nazwisko" name="surname" />
      {state?.errors?.surname && <p>{state.errors.surname}</p>}
      <Input id="email" label="Email" name="email" />
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <Input id="password" label="Hasło" name="password" inputType="password" />
      {state?.errors?.password && (
        <div>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <Input
        id="repassword"
        label="Powtórz hasło"
        name="repassword"
        inputType="password"
      />
      {state?.errors?.repassword && <p>{state.errors.repassword}</p>}

      <Button disabled={pending} type="submit" hasArrow={false}>
        Zarejestruj się
      </Button>
    </form>
  );
};

export default SignupForm;
