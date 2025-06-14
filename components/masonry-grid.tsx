import Image from 'next/image';
import Link from 'next/link';

export interface ImageData {
  id: string;
  src: string;
  title: string;
  author: string;
  likes: number;
  width: number;
  height: number;
}

interface MasonryGridProps {
  images: ImageData[];
  className?: string;
}

export default function MasonryGrid({ images, className = "" }: MasonryGridProps) {
  return (
    <div className={`columns-1 sm:columns-2 lg:columns-3 gap-1 ${className}`}>
      {images.map((image) => (
        <div key={image.id} className="break-inside-avoid mb-1">
          <div className="group relative overflow-hidden bg-muted">
            <Link href={`/images/${image.id}`}>
              <div className="relative">
                <Image
                  src={image.src}
                  alt={image.title}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Overlay with image info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm line-clamp-2 mb-2 font-medium">
                      {image.title}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-sm font-medium">
                        {image.author}
                      </span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-white/90" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-white/90 text-sm font-medium">
                          {image.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 