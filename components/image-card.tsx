import { publicImage } from '@/app/actions/images';
import { Tables } from '@/database.types';
import { cn } from '@/lib/utils';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { SubmitButton } from './submit-button';
import { Copy } from 'lucide-react';
import CopyButton from './copy-button';
import Link from 'next/link';

export interface ImageCardProps extends Tables<'images'> {
  url: string;
  showAuthor?: boolean;
  profile?: Tables<'profiles'> | null
}

export async function ImageCard({
  url,
  input,
  id,
  profileId,
  isPublic,
  showAuthor = false,
  profile,
}: ImageCardProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const canPublic = user && user.id === profileId && !isPublic;

  return (
    <div className="overflow-hidden rounded-2xl shadow-sm">
      <div className="relative flex w-full flex-col rounded-xl group">
        {input && url && (
          <Link href={`/images/${id}`} scroll={false}>
            <div className="relative aspect-square size-full cursor-pointer select-none">
              <Image
                alt={input}
                src={url}
                loading="lazy"
                width={500}
                height={500}
                className={cn(
                  'pointer-events-none size-full rounded-xl object-cover object-top',
                )}
              />
              <div
                className={cn(
                  'hidden group-hover:inline-flex absolute size-full p-2.5 bg-transparent bg-gradient-to-t from-background/70 to-transparent to-40% bottom-0 transition-colors',
                  'group-hover:flex items-end',
                )}
              >
                <div className="w-full inline-flex items-center gap-2">
                  <span className="text-xs line-clamp-3 text-foreground/80">
                    {input}
                  </span>
                  <CopyButton
                    content={input}
                    variant="link"
                    size="icon-xs"
                    className="text-foreground/70 hover:text-foreground"
                  >
                    <Copy />
                  </CopyButton>
                </div>
              </div>
            </div>
          </Link>
        )}

        {showAuthor && (
          <div className="mt-2 rounded-xl p-1">
            <p className={cn('text-sm truncate')}>{profile?.id}</p>
            {canPublic && (
              <form action={publicImage}>
                <input hidden defaultValue={id} name="id" />
                <SubmitButton>Public</SubmitButton>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
