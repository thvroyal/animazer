'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  dialogContentStyles,
} from '@/components/ui/dialog';
import { useClickOutside } from '@/hooks/use-click-outside';
import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ModalWrapper({
  children,
  isModal,
}: {
  children: React.ReactNode;
  isModal?: boolean;
}) {
  const router = useRouter();
  // const [action, setAction] = useState<HTMLButtonElement | null>(null);
  const closeModal = () => {
    isModal ? router.back() : router.push('/explore');
  };

  const ref = useClickOutside(
    closeModal,
    null,
    // [action],
  );

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={closeModal}>
      <DialogPortal>
        <DialogOverlay
          className={cn(
            'bg-background/70 backdrop-blur-sm',
            !isModal && 'bg-background/90',
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            dialogContentStyles(),
            'bg-transparent border-0',
            'overflow-y-hidden max-w-full max-h-screen shadow-none',
            'flex',
          )}
        >
          <div className="flex flex-col">
            <DialogClose asChild>
              <Button
                size="icon"
                variant="link"
                className="bg-popover border text-foreground/70 hover:text-foreground"
              >
                <X />
              </Button>
            </DialogClose>
            {/* <Button
              // ref={setAction}
              onClick={() => console.log('clicked close')}
            >
              <X />
            </Button> */}
          </div>
          <div
            className="flex-1 h-inherit bg-background border sm:rounded-lg"
            ref={ref}
          >
            {children}
          </div>
          <div className="w-10 pointer-events-none select-none invisible" />
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
