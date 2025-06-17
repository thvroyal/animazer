import ImageCard, { ImageData } from './image-card';

interface MasonryGridProps {
  images: ImageData[];
  className?: string;
}

export default function MasonryGrid({
  images,
  className = '',
}: MasonryGridProps) {
  return (
    <div className={`columns-1 sm:columns-2 lg:columns-3 gap-1 ${className}`}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
