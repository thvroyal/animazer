import MasonryGrid from '@/components/masonry-grid';
import { ImageData } from '@/components/image-card';

// Demo data with natural aspect ratios
const demoImages: ImageData[] = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop',
    title: 'Skeleton army in industrial wasteland with stars',
    author: 'wargamer8241',
    likes: 163,
    width: 400,
    height: 600
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=300&fit=crop',
    title: 'Cheetah running through desert landscape',
    author: 'azfromaz',
    likes: 139,
    width: 400,
    height: 300
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=400&h=400&fit=crop',
    title: 'Tennis equipment on court with multiple balls',
    author: 'anastasiya_bulykina',
    likes: 119,
    width: 400,
    height: 400
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
    title: 'Mountain landscape with lake reflection',
    author: 'naturephoto',
    likes: 95,
    width: 400,
    height: 500
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?w=400&h=350&fit=crop',
    title: 'Abstract geometric architecture forms',
    author: 'architect_vision',
    likes: 87,
    width: 400,
    height: 350
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&h=600&fit=crop',
    title: 'Colorful street art mural',
    author: 'street_artist',
    likes: 76,
    width: 400,
    height: 600
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=250&fit=crop',
    title: 'Ocean waves at sunset',
    author: 'ocean_lover',
    likes: 201,
    width: 400,
    height: 250
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop',
    title: 'Urban cityscape at night',
    author: 'city_explorer',
    likes: 156,
    width: 400,
    height: 400
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop',
    title: 'Forest path through tall trees',
    author: 'forest_wanderer',
    likes: 124,
    width: 400,
    height: 700
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=320&fit=crop',
    title: 'Desert dunes patterns',
    author: 'desert_explorer',
    likes: 89,
    width: 400,
    height: 320
  }
];

export default function ExplorePage() {
  return (
    <div className="h-full w-full p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Explore</h1>
      </div>
      
      <MasonryGrid images={demoImages} />
    </div>
  );
}
