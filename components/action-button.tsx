'use client';

import { ComponentProps } from 'react';
import { SubmitButton } from './submit-button';
import { Button } from './ui/button';

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
  serverFn?: string | ((formData: FormData) => void);
};

export default function ActionButton({ serverFn, ...props }: Props) {
  return (
    <form action={serverFn}>
      <SubmitButton {...props} />
    </form>
  );
}
