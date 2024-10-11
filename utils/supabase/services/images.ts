import { Tables } from '@/database.types';
import { createClient } from '../server';

const getSignedImageUrls = async <
  T extends Tables<'images'> = Tables<'images'>,
>(
  data: T[] | null,
) => {
  const supabase = createClient();
  const imageUrls = data
    ? data.flatMap((item) => `${item.isPublic ? 'public/' : ''}${item.id}.jpeg`)
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
    .select(`*, profile:profiles(*)`)
    .eq('isPublic', true)
    .order('createdAt', { ascending: false })
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
    .eq('profileId', user.id)
    .order('createdAt', { ascending: false })
    .throwOnError();

  return await getSignedImageUrls(data);
};

export const getImageFromId = async (imageId: string) => {
  const supabase = createClient();

  const { data: image } = await supabase
    .from('images')
    .select(`*, profile:profiles(*)`)
    .eq('id', imageId)
    .single();

  if (!image) return null;
  return (await getSignedImageUrls([image])).at(0);
};
