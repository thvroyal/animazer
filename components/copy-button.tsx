'use client';

import { useCopy } from '@/hooks/use-copy';
import { PropsWithChildren } from 'react';
import { Button, ButtonProps } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface CopyButtonProps extends PropsWithChildren, ButtonProps {
  content: string;
  successMessage?: string;
}

export default function CopyButton({
  content,
  children,
  ...props
}: CopyButtonProps) {
  const [_, copy] = useCopy();
  const { toast } = useToast();

  const handleCopy = (text: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    copy(text)
      .then(() => {
        toast({
          title: 'Copied to clipboard',
        });
      })
      .catch((error) => {
        toast({
          title: 'Failed copy to clipboard',
          description: error,
          variant: 'destructive',
        });
      });
  };

  return (
    <Button {...props} onClick={handleCopy(content)}>
      {children}
    </Button>
  );
}
