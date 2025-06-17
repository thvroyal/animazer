import { signOutAction } from '@/app/actions/auth';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link href="/auth/sign-in">
        <Button size="sm" className="gap-2">
          Login
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="bg-background text-foreground rounded-full">
          <Avatar className="size-8">
            <AvatarImage src={user.user_metadata?.avatar_url} className="object-cover" />
            <AvatarFallback>
              {user.user_metadata?.full_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.email}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.user_metadata?.full_name || 'User'}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full text-left cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
