import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';
import ActionButton from './action-button';
import { createClient } from '@/utils/supabase/server';
import { Tables } from '@/database.types';
import { SubmitButton } from './submit-button';
import { publicImage } from '@/app/actions';

interface ImageCardProps extends Tables<'images'> {
  url: string;
}

export async function ImageCard({
  url,
  input,
  id,
  created_by,
  is_public,
}: ImageCardProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const canPublic = user && user.id === created_by && !is_public;

  return (
    <div className="overflow-hidden rounded-2xl shadow-sm">
      <div className="flex w-full flex-col rounded-xl bg-white/5 p-2">
        {input && url && (
          <div className="aspect-[1] size-full cursor-pointer select-none">
            <Image
              alt={input}
              src={url}
              loading="lazy"
              width={100}
              height={100}
              className={cn(
                'pointer-events-none size-full rounded-xl object-cover object-top',
              )}
            />
          </div>
        )}

        <div className="mt-2 rounded-xl p-1">
          {/* <div className="flex w-full items-center justify-between">
            <div className="relative flex items-center justify-start gap-1 text-xs text-gray-400">
              Prompt
              <Button
                variant={'ghost'}
                size={'icon'}
                title="Copy to clipboard"
                className="size-5 p-0.5"
                onClick={onCopy}
              >
                {hasCheckIcon ? (
                  <CheckIcon className="size-3.5 text-neutral-600" />
                ) : (
                  <Icons.copy className="size-3.5 text-gray-600" />
                )}
              </Button>
            </div>
            {imgUrl && isShareable && (
              <div className="flex items-center justify-center gap-1.5 text-gray-600">
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  title="Download"
                  className="animate-jelly size-5 p-0.5"
                  onClick={onDownload}
                >
                  <Icons.download className="size-3.5 text-muted-foreground" />
                </Button>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  title="Share"
                  className="animate-jelly size-5 p-0.5"
                  onClick={onShare}
                >
                  <Icons.share className="size-3.5 text-muted-foreground" />
                </Button>
              </div>
            )}
          </div> */}
          <p className={cn('text-sm truncate')}>{input}</p>
          {canPublic && (
            <form action={publicImage}>
              <input hidden defaultValue={id} name="id" />
              <SubmitButton>Public</SubmitButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
