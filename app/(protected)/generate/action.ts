'use server';

import { createClient } from '@/utils/supabase/server';

export const generate = async (formData: FormData) => {
  const prompt = formData.get('prompt') as string;

  try {
    const supabase = createClient();

    const { data: record, error } = await supabase
      .from('images')
      .insert({
        input: prompt,
      })
      .select()
      .single();

    if (error) throw error;

    const path = record.is_public
      ? `public/${record.id}.jpeg`
      : `${record.id}.jpeg`;

    const { data: uploadInfo } = await supabase.storage
      .from('animazer')
      .createSignedUploadUrl(path);

    await supabase.functions.invoke('generate', {
      body: {
        upload: uploadInfo,
        record,
      },
    });

    return 'Generated image!';
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate image.');
  }
};
