import { getImageFromId } from '@/utils/supabase/services/images';
import Image from 'next/image';
import { ModalWrapper } from './modal-wrapper';

export default async function DetailsPage({
  params,
  isModal = false
}: {
  params: { imageId: string };
  isModal?: boolean
}) {
  const [image] = (await getImageFromId(params.imageId)) || [];

  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <ModalWrapper isModal={isModal}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Image Details</h1>
        {image && (
          <Image
            src={image.url}
            alt={image.input || image.id}
            width={500}
            height={500}
          />
        )}
        <p>{image.input}</p>
      </div>
    </ModalWrapper>
  );
}
