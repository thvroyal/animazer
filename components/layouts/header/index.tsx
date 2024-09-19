import AuthButton from '@/components/header-auth';
import Link from 'next/link';
import Navigation from './navigation';

export default function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full container flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center">
          <Link href={'/'} className="font-semibold">
            Animazer
          </Link>
          <Navigation />
        </div>
        <AuthButton />
      </div>
    </nav>
  );
}
