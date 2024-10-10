import { getImageFromId } from '@/utils/supabase/services/images';
import Image from 'next/image';
import { ModalWrapper } from './modal-wrapper';
import { format } from 'date-fns';

export default async function DetailsPage({
  params,
  isModal = false,
}: {
  params: { imageId: string };
  isModal?: boolean;
}) {
  const [image] = (await getImageFromId(params.imageId)) || [];

  if (!image) {
    return <div>Image not found</div>;
  }

  return (
    <ModalWrapper isModal={isModal}>
      <div className="grid grid-cols-10 p-6 gap-6">
        <div className="relative col-span-7 h-full select-none cursor-pointer flex items-center justify-center">
          {image && (
            <Image
              src={image.url}
              alt={image.input || image.id}
              loading="lazy"
              width={650}
              height={650}
              className="h-full rounded-xl object-cover object-top"
            />
          )}
        </div>
        <div className="col-span-3">
          <p>{image.profileId}</p>
          <p>{format(image.createdAt, 'yyyy-MM-dd HH:mm')}</p>
          <p>{image.input}</p>
        </div>
      </div>
    </ModalWrapper>
  );
}
