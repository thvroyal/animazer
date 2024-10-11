'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { v4 as uuid } from 'uuid';
import { setFlashMessage } from '@/utils/flash-message';

export const publicImage = async (formData: FormData) => {
  const id = formData.get('id')?.toString();
  if (!id) {
    setFlashMessage({ type: "error", message: "Image ID is required" });
    return;
  }

  const supabase = createClient();
  const { data: image } = await supabase.from('images').select('*').eq('id', id).single();
  if (!image) {
    setFlashMessage({ type: "error", message: "Image not found" });
    return;
  }

  const isPublic = !image.isPublic;
  const oldPath = isPublic ? `${id}.jpeg` : `public/${id}.jpeg`;
  const newPath = isPublic ? `public/${id}.jpeg` : `${id}.jpeg`;

  try {
    await supabase.from('images').update({ isPublic: isPublic }).eq('id', id);
    await supabase.storage.from('animazer').move(oldPath, newPath);
    setFlashMessage({ type: "success", message: `Image visibility updated to ${isPublic ? 'public' : 'private'}` });
  } catch (error) {
    console.error(error);
    setFlashMessage({ type: "error", message: "Failed to update image visibility" });
  }

  revalidatePath('/gallery', 'page');
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
        isPublic,
      })
      .select()
      .single()
      .throwOnError();

    const { data: signedImageUrl } = await supabase.storage
      .from('animazer')
      .createSignedUrl(path, 60);

    setFlashMessage({ type: "success", message: "Image generated successfully" });
    return {
      message: 'Generated image',
      imageUrl: signedImageUrl?.signedUrl ?? null,
      error: null,
    };
  } catch (error) {
    console.log(error);
    setFlashMessage({ type: "error", message: "Failed to generate image" });
    return {
      error: 'Failed to generate image.',
    };
  }
};
