'use server';

import { createClient } from '@/utils/supabase/server';
import { TablesInsert, Tables } from '@/database.types';

export async function getOwnerImages() {
  const supabase = createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: images } = await supabase
    .from('images')
    .select('*')
    .eq('user', user.id)
    .order('created_at', { ascending: false });

  if (!images) {
    return [];
  }

  // Get public URLs for the images
  const imagesWithUrls = await Promise.all(
    images.map(async (image) => {
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(image.url);
      
      return {
        ...image,
        url: data.publicUrl,
      };
    })
  );

  return imagesWithUrls;
}

export async function getPublicImages() {
  const supabase = createClient();

  const { data: images } = await supabase
    .from('images')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (!images) {
    return [];
  }

  // Get public URLs for the images
  const imagesWithUrls = await Promise.all(
    images.map(async (image) => {
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(image.url);
      
      return {
        ...image,
        url: data.publicUrl,
      };
    })
  );

  return imagesWithUrls;
}

export async function insertImage(imageData: TablesInsert<'images'>) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('images')
    .insert(imageData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to insert image: ${error.message}`);
  }

  return data;
}

export async function uploadImageToStorage(
  fileName: string,
  fileBuffer: Buffer,
  contentType: string = 'image/jpeg'
) {
  const supabase = createClient();
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, fileBuffer, {
      contentType,
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  return data;
} 