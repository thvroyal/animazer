'use server';

import { createClient } from '@/utils/supabase/server';
import { v4 as uuid } from 'uuid';

export const publicImage = async (formData: FormData) => {
  const id = formData.get('id')?.toString();
  if (!id) return;

  const supabase = createClient();
  await supabase.from('images').update({ is_public: true }).eq('id', id);
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

    return {
      message: 'Generated image',
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to generate image.',
    };
  }
};
