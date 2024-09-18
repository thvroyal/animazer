'use server';

import { createClient } from '@/utils/supabase/server';
import { HfInference } from '@huggingface/inference';

export const generate = async (formData: FormData) => {
  const prompt = formData.get('prompt') as string;

  const model = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_KEY!);

  try {
    const blobImage = (await model.request({
      model: 'alvdansen/littletinies',
      inputs: prompt,
    })) as Blob;

    const supabase = createClient();
    
    const { data: { user } } = await supabase.auth.getUser()

    const { data: images, error } = await supabase
      .from('images')
      .insert({
        input: prompt,
      })
      .select();

    if (error) throw error;

    const { error: uploadError } = await supabase.storage
      .from('animazer')
      .upload(`${user?.id}/${images[0]?.id}.jpeg`, blobImage, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;
    
  } catch (error) {
    console.error(error)
    throw new Error('Failed to generate image.')
  }
};
