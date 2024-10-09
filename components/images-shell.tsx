import React from 'react';

import { ImageCard, ImageCardProps } from '@/components/image-card';

interface ImagesSectionProps {
  images: ImageCardProps[];
  showAuthor?: ImageCardProps['showAuthor'];
}

export const ImagesShell = React.forwardRef<HTMLDivElement, ImagesSectionProps>(
  ({ images, showAuthor }, ref) => {
    return (
      <section className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((data, idx) => (
          <ImageCard key={idx} showAuthor={showAuthor} {...data} />
        ))}
        {/* {hasNextPage && (
          <>
            <div
              ref={ref}
              className="aspect-[0.9] size-full animate-pulse rounded-xl bg-muted"
            />
            {Array.from({ length: 9 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="aspect-[0.9] size-full rounded-xl"
              />
            ))}
          </>
        )} */}
      </section>
    );
  },
);

ImagesShell.displayName = 'ImagesSection';
