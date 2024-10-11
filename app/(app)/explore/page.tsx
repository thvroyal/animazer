import { ImagesShell } from '@/components/images-shell';
import { getPublicImages } from '@/utils/supabase/services/images';

export default async function ExplorePage() {
  const images = await getPublicImages();

  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <h2 className="font-medium text-xl mb-4">Showcase</h2>
      <ImagesShell images={images} showAuthor />
    </main>
  );
}
