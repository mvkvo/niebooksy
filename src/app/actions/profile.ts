'use server';

import getSession from '@/lib/getSession';
import { ProfileFormSchema } from '@/lib/schemas/profile';
import { SignState } from '@/types/signup';
import { sql } from '@vercel/postgres';
import cloudinary from '@/lib/cloudinary';

export async function updateProfileInformation(
  prevState: SignState,
  formData: FormData
): Promise<SignState> {
  const session = await getSession();
  if (!session || !session.user?.email) {
    return { success: false, message: 'Unauthorized' };
  }

  const data = {
    name: formData.get('name'),
    surname: formData.get('surname'),
  };
  const result = ProfileFormSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { success: false, errors };
  }

  const { name, surname } = result.data;
  try {
    await sql`UPDATE users
    SET name = ${name}, surname = ${surname}
    WHERE id = ${session.user.id}`;

    return { success: true, message: 'Zaktualizowano dane.' };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      success: false,
      message: 'Wystąpił błąd podczas aktualizowania danych.',
    };
  }
}

export async function uploadProfilePicture(formData: FormData) {
  const session = await getSession();
  if (!session || !session.user?.email) {
    return { success: false, message: 'Unauthorized' };
  }

  const file = formData.get('profile_picture') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  //check and delete previous avatar if exists
  const userRes =
    await sql`SELECT profile_picture FROM users WHERE id = ${session.user.id}`;
  const previousUrl = userRes.rows?.[0]?.profile_picture as string | null;

  if (previousUrl) {
    const match = previousUrl.match(
      /\/upload\/(?:v\d+\/)?(.+)\.(?:jpg|jpeg|png|webp|gif)/
    );
    const publicId = match?.[1];

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  }

  //upload new avatar
  const uploadResult = await new Promise<{ secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: 'avatars' }, (error, result) => {
          if (error || !result) return reject(error);
          resolve(result as { secure_url: string });
        })
        .end(buffer);
    }
  );

  try {
    await sql`UPDATE users 
    SET profile_picture = ${uploadResult.secure_url} 
    WHERE id = ${session.user.id}`;

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      success: false,
      message: 'Wystąpił błąd podczas aktualizowania danych.',
    };
  }
}
