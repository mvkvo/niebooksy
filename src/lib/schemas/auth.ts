import { z } from 'zod';
import { isEmailTaken, isUsernameTaken } from '../db/users';

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Nieprawidłowy email' }),
  password: z.string().min(1, { message: 'Hasło jest wymagane' }),
});

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: 'Nazwa użytkownika musi zawierać conajmniej 2 znaki' })
      .max(12, {
        message: 'Nazwa użytkownika może zawierać maksymalnie 12 znaków',
      })
      .regex(/^[a-z0-9_]+$/, {
        message:
          'Nazwa użytkownika może zawierać tylko litery, liczby i podkreślenia',
      })
      .refine(
        async (username) => {
          const taken = await isUsernameTaken(username);
          return !taken;
        },
        { message: 'Nazwa użytkownika jest już zajęta!' }
      ),
    name: z
      .string()
      .min(2, { message: 'Imię musi zawierać conajmniej 2 znaki' })
      .max(25, { message: 'Imię może zawierać maksymalnie 25 znaków' })
      .regex(/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]+$/, {
        message: 'Imię może zawierać tylko litery',
      }),
    surname: z
      .string()
      .min(2, { message: 'Nazwisko musi zawierać conajmniej 2 znaki' })
      .max(25, { message: 'Nazwisko może zawierać maksymalnie 25 znaków' })
      .regex(/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s]+$/, {
        message: 'Nazwisko może zawierać tylko litery',
      }),
    email: z
      .string()
      .email({ message: 'Nieprawidłowy email' })
      .refine(
        async (email) => {
          const taken = await isEmailTaken(email);
          return !taken;
        },
        { message: 'Email jest już zajęty!' }
      ),
    password: z
      .string()
      .min(8, { message: 'Hasło musi zawierać przynajmniej 8 znaków!' })
      .regex(/[a-zA-Z]/, {
        message: 'Hasło musi zawierać przynajmniej 1 literę',
      })
      .regex(/[0-9]/, { message: 'Hasło musi zawierać przynajmniej 1 cyfrę!' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Hasło musi zawierać przynajmniej 1 znak specjalny!',
      })
      .trim(),
    repassword: z
      .string()
      .min(1, { message: 'Potwierdzenie hasła jest wymagane!' }),
  })
  .refine((data) => data.password === data.repassword, {
    message: '\nHasła muszą być takie same!',
    path: ['repassword'],
  });

export type SignupSchema = z.infer<typeof SignupFormSchema>;
export type SigninSchema = z.infer<typeof SigninFormSchema>;
