import { ImagesShell } from '@/components/images-shell';
import { getOwnerImages } from '@/utils/supabase/services/images';

export default async function ProfilePage() {
  const images = await getOwnerImages()

  return (
    <main className="flex-1 flex flex-col gap-6 px-4">
      <h2 className="font-medium text-xl mb-4">My Gallery</h2>
      <ImagesShell images={images} />
    </main>
  );
}
