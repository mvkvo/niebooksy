'use server';

import { SignupFormSchema } from '@/lib/schemas/auth';
import { SignState } from '@/types/signup';
import { sql } from '@vercel/postgres';
import { hash } from 'bcrypt';

export async function signup(
  prevState: SignState,
  formData: FormData
): Promise<SignState> {
  const data = {
    username: formData.get('username'),
    name: formData.get('name'),
    surname: formData.get('surname'),
    email: formData.get('email'),
    password: formData.get('password'),
    repassword: formData.get('repassword'),
  };

  const result = await SignupFormSchema.safeParseAsync(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return {
      success: false,
      errors,
      values: {
        username: data.username?.toString(),
        name: data.name?.toString(),
        surname: data.surname?.toString(),
        email: data.email?.toString(),
        password: data.password?.toString(),
        repassword: data.repassword?.toString(),
      },
    };
  }

  const { username, name, surname, email, password } = result.data;

  try {
    const hashedPassword = await hash(password, 10);
    await sql`INSERT INTO users (username, email, password, created_at, name, surname) VALUES (${username}, ${email}, ${hashedPassword}, CURRENT_TIMESTAMP, ${name}, ${surname})`;
    return { success: true, message: 'Rejestracja powiodła się.' };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      success: false,
      message: 'Rejestracja nie powiodła się.',
      values: result.data,
    };
  }
}
