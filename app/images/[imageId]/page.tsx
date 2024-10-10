import { getImageFromId } from '@/utils/supabase/services/images';
import Image from 'next/image';
import { ModalWrapper } from './modal-wrapper';
import { format } from 'date-fns';
import CopyButton from '@/components/copy-button';
import { Copy } from 'lucide-react';

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
        <div className="col-span-3 space-y-6">
          <p>{image.profile?.id}</p>
          <p className="text-xs text-foreground/50">{format(image.createdAt, 'yyyy-MM-dd HH:mm')}</p>
          <div className="w-full gap-2 p-3 bg-popover-foreground/10 rounded-lg">
            <p className="text-xs text-foreground/50">Prompt</p>
            <div className='inline-flex items-center gap-2'>
              <span className="text-xs text-foreground/80">
                {image.input}
              </span>
              <CopyButton
                content={image.input || ''}
                variant="link"
                size="icon-xs"
                className="text-foreground/70 hover:text-foreground"
              >
                <Copy />
              </CopyButton>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
