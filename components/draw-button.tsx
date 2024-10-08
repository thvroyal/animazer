'use client';

import { WandSparkles } from 'lucide-react';
import { Button } from './ui/button';

import { generate } from '@/app/actions/images';
import {
  Dialog,
  dialogContentStyles,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/utils/cn';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { useId, useRef, useState, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const initialState = {
  message: '',
  imageUrl: null,
  error: null,
};

interface DrawButtonProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

function DrawButtonDialog({ onOpenChange, open }: DrawButtonProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(generate, initialState);
  const inputRef = useRef<HTMLDivElement>(null);
  const [pending, startTransition] = useTransition();
  const formId = useId();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!inputRef.current) return;
    const prompt = [...inputRef.current?.childNodes]
      .flatMap((node) => node.textContent)
      .join(' ');
    const formData = new FormData();
    formData.append('prompt', prompt);
    startTransition(() => {
      formAction(formData);
    });
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (state.imageUrl) router.refresh();
  };

  const isDone = !pending || (pending && state.error);

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" className="inline-flex gap-2">
          <WandSparkles size={16} />
          <span>Draw</span>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="bg-transparent bg-gradient-to-t from-background/80 to-transparent to-80%" />
        <DialogPrimitive.Content
          className={cn(
            dialogContentStyles(),
            'max-w-xl p-4',
            !state.imageUrl && 'bottom-0 top-[unset] translate-y-[-10%]',
          )}
        >
          <VisuallyHidden.Root asChild>
            <DialogTitle>Prompt Generating</DialogTitle>
          </VisuallyHidden.Root>
          {state.imageUrl ? (
            <Image
              src={state.imageUrl}
              alt="generated image"
              width={100}
              height={100}
              className="size-full rounded-xl object-cover object-top"
            />
          ) : (
            <>
              <form action={handleSubmit} id={formId}>
                <div
                  contentEditable={!!isDone}
                  ref={inputRef}
                  tabIndex={0}
                  data-placeholder="Describe what you want to draw?"
                  className={cn(
                    'focus-visible:outline-none w-full break-words whitespace-break-spaces overflow-y-auto min-h-14 max-h-96',
                  )}
                  onKeyDown={handleKeyDown}
                />
              </form>
              {!isDone && <p>Generating image...</p>}
              <div className="inline-flex text-sm w-full justify-between">
                <Select defaultValue="alvdansen/phantasma-anime">
                  <SelectTrigger className="w-[160px] text-foreground/80 text-xs">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alvdansen/phantasma-anime">
                      phantasma-anime
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  size="sm"
                  type="submit"
                  form={formId}
                  disabled={!isDone}
                >
                  {isDone ? 'Draw' : 'Drawing'}
                </Button>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export default function DrawButton() {
  const [key, setKey] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (open: boolean) => {
    setOpen(open);
    setKey((key) => key + 1);
  };

  return <DrawButtonDialog key={key} open={open} onOpenChange={handleOpen} />;
}
