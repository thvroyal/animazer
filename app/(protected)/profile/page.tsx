import { ImagesShell } from '@/components/images-shell';
import { createClient } from '@/utils/supabase/server';

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data } = await supabase
    .from('images')
    .select()
    .eq('created_by', user.id)
    .order('created_at', { ascending: false })
    .throwOnError();
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

  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <h2 className="font-medium text-xl mb-4">Next steps</h2>
      <ImagesShell images={images} />
    </main>
  );
}
