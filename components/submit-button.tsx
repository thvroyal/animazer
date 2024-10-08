'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { Loader } from 'lucide-react';
import { type ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';
type Props = ComponentProps<typeof Button> & {
  loading?: boolean;
};

export function SubmitButton({
  children,
  loading = false,
  className,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  const isLoading = pending || loading;
  return (
    <Button
      className={cn('transition-all', className)}
      type="submit"
      aria-disabled={isLoading}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader className="animate-spin" size={16} /> : children}
    </Button>
  );
}
