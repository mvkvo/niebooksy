'use server';

import { SigninFormSchema } from '@/lib/schemas/auth';
import { SignState } from '@/types/signup';

export async function validateLogin(
  prevState: SignState,
  formData: FormData
): Promise<SignState> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = SigninFormSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, errors };
  }
  return { success: true };
}
