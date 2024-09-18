import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ImageCardProps {
  imgUrl: string | null;
  prompt: string | null;
}

export function ImageCard({ imgUrl, prompt }: ImageCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-sm">
      <div className="flex w-full flex-col rounded-xl bg-white/5 p-2">
        {prompt && imgUrl && (
          <div className="aspect-[1] size-full cursor-pointer select-none">
            <Image
              alt={prompt}
              src={imgUrl}
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
          <p className={cn('text-sm truncate')}>{prompt}</p>
        </div>
      </div>
    </div>
  );
}
