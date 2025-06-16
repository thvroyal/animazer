import Image from 'next/image';
import { ModalWrapper } from './modal-wrapper';
import { format } from 'date-fns';
import { Copy } from 'lucide-react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function DetailsPage({
  params,
  isModal = false,
}: {
  params: { imageId: string };
  isModal?: boolean;
}) {
  const supabase = createClient();
  
  // Get image from database
  const { data: imageData, error } = await supabase
    .from('images')
    .select('*')
    .eq('id', params.imageId)
    .single();

  if (error || !imageData) {
    redirect('/explore');
  }

  // Get public URL for the image
  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(imageData.url);

  const image = {
    ...imageData,
    url: urlData.publicUrl,
    createdAt: imageData.created_at ? new Date(imageData.created_at) : new Date(),
  };

  return (
    <ModalWrapper isModal={isModal}>
      <div className="grid grid-cols-10 p-6 gap-6">
        <div className="relative col-span-7 h-full select-none cursor-pointer flex items-center justify-center">
          {image && (
            <Image
              src={image.url}
              alt={image.prompt || image.id}
              loading="lazy"
              width={650}
              height={650}
              className="h-full rounded-xl object-cover object-top"
            />
          )}
        </div>
        <div className="col-span-3 space-y-6">
          <p>{image.user}</p>
          <p className="text-xs text-foreground/50">
            {format(image.createdAt, 'yyyy-MM-dd HH:mm')}
          </p>
          <div className="w-full gap-2 p-3 bg-popover-foreground/10 rounded-lg">
            <p className="text-xs text-foreground/50">Prompt</p>
            <div className="inline-flex items-center gap-2">
              <span className="text-xs text-foreground/80">{image.prompt}</span>
              {/* <CopyButton
                content={image.input || ''}
                className="text-foreground/70 hover:text-foreground"
              >
                <Copy />
              </CopyButton> */}
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
