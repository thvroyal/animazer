import Hero from '@/components/hero';
import { ImagesShell } from '@/components/images-shell';
import { createClient } from '@/utils/supabase/server';

export default async function Index() {
  const supabase = createClient();

  const { data, error } = await supabase.from('images').select();
  const imageUrls = data
    ? data.flatMap((item) => `${item.created_by}/${item.id}.jpeg`)
    : [];
  const { data: signedImageUrls = [] } = await supabase.storage
    .from('animazer')
    .createSignedUrls(imageUrls, 60);
  const images = data
    ? data?.map((item, idx) => ({
        url: signedImageUrls?.[idx]?.signedUrl ?? '',
        prompt: item.input ?? '',
      }))
    : [];

  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Next steps</h2>
        <ImagesShell images={images} />
      </main>
    </>
  );
}
