import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Podaj prawidłowy email." }),
});

export const SignupFormSchema = z
  .object({
    email: z.string().email({ message: "Podaj prawidłowy email." }),
    password: z
      .string()
      .min(8, { message: "Hasło musi zawierać przynajmniej 8 znaków!" })
      .regex(/[a-zA-Z]/, {
        message: "Hasło musi zawierać przynajmniej 1 literę",
      })
      .regex(/[0-9]/, { message: "Hasło musi zawierać przynajmniej 1 cyfrę!" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Hasło musi zawierać przynajmniej 1 znak specjalny!",
      })
      .trim(),
    repassword: z
      .string()
      .min(1, { message: "Potwierdzenie hasła jest wymagane!" }),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Hasła muszą być takie same!",
    path: ["repassword"],
  });

export const AnnouncementFormSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Oferta musi zawierać co najmniej 10 znaków" })
    .max(500, { message: "Oferta może zawierać maksymalnie 500 znaków" }),
});

export type FormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        repassword?: string[];
        content?: string[];
      };
      message?: string;
    }
  | undefined;
