import { z } from 'zod';

export const ProfileFormSchema = z.object({
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
});

export type ProfileSchema = z.infer<typeof ProfileFormSchema>;
