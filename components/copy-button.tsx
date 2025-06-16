'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from '@/components/ui/button';

interface CopyButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  content: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

export default function CopyButton({ content, children, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button onClick={handleCopy} {...props}>
      {copied ? <Check className="h-4 w-4" /> : children || <Copy className="h-4 w-4" />}
    </Button>
  );
} 