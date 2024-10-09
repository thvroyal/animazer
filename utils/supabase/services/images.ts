import { Tables } from '@/database.types';
import { createClient } from '../server';

const getSignedImageUrls = async (data: Tables<'images'>[] | null) => {
  const supabase = createClient();
  const imageUrls = data
    ? data.flatMap(
        (item) => `${item.is_public ? 'public/' : ''}${item.id}.jpeg`,
      )
    : [];
  const { data: signedImageUrls = [] } = await supabase.storage
    .from('animazer')
    .createSignedUrls(imageUrls, 60);

  const images = data
    ? data?.map((item, idx) => ({
        ...item,
        url: signedImageUrls?.[idx]?.signedUrl ?? '',
      }))
    : [];

  return images;
};

export const getPublicImages = async () => {
  const supabase = createClient();

  const { data } = await supabase
    .from('images')
    .select()
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .throwOnError();

  return await getSignedImageUrls(data);
};

export const getOwnerImages = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from('images')
    .select()
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })
    .throwOnError();

  return await getSignedImageUrls(data);
};