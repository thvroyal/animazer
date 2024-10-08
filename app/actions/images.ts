'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { v4 as uuid } from 'uuid';

export const publicImage = async (formData: FormData) => {
  const id = formData.get('id')?.toString();
  if (!id) return;

  const supabase = createClient();
  const { data: image } = await supabase.from('images').select('*').eq('id', id).single();
  if (!image) return;

  const isPublic = !image.is_public;
  const oldPath = isPublic ? `${id}.jpeg` : `public/${id}.jpeg`;
  const newPath = isPublic ? `public/${id}.jpeg` : `${id}.jpeg`;

  await supabase.from('images').update({ is_public: isPublic }).eq('id', id);
  await supabase.storage.from('animazer').move(oldPath, newPath);
  revalidatePath('/profile', 'page');
};

export const generate = async (prevState: any, formData: FormData) => {
  const input = formData.get('prompt') as string;
  const isPublic = (formData.get('isPublic') ?? false) as boolean;

  try {
    const supabase = createClient();

    const id = uuid();
    const path = isPublic ? `public/${id}.jpeg` : `${id}.jpeg`;
    const { data: uploadInfo } = await supabase.storage
      .from('animazer')
      .createSignedUploadUrl(path);

    const { error } = await supabase.functions.invoke('generate', {
      body: {
        upload: uploadInfo,
        input,
      },
    });
    if (error) throw error;

    await supabase
      .from('images')
      .insert({
        id,
        input,
      })
      .select()
      .single()
      .throwOnError();

    const { data: signedImageUrl } = await supabase.storage
      .from('animazer')
      .createSignedUrl(path, 60);

    return {
      message: 'Generated image',
      imageUrl: signedImageUrl?.signedUrl ?? null,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to generate image.',
    };
  }
};
