'use client';

import { Dialog, DialogOverlay, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export function ModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent
          className="overflow-y-hidden"
          overlayClassName="bg-background/40 backdrop-blur-sm"
        >
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
