'use client';

import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from '@/components/ui/prompt-input';
import { Button } from '@/components/ui/button';
import { ArrowUp, Globe, Mic, MoreHorizontal, Plus } from 'lucide-react';
import type React from 'react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { generateImage, type GenerateImageResult } from '@/app/actions/images';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

function PromptInputWithActions() {
  const [prompt, setPrompt] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Use React 19's useActionState hook
  const [state, formAction, isPending] = useActionState<
    GenerateImageResult | null,
    FormData
  >(generateImage, null);

  // Use Framer Motion's useScroll hook
  const { scrollY } = useScroll();

  // Handle scroll direction detection using useMotionValueEvent
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const direction = latest > previous ? 'down' : 'up';

    // Only update visibility if we've scrolled a meaningful amount
    const delta = Math.abs(latest - previous);
    if (direction === 'down' && latest > 100 && delta > 5) {
      setIsVisible(false);
    } else if (direction === 'up') {
      setIsVisible(true);
    }
  });

  // Handle the result state
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      // Show success toast
      toast({
        title: 'Success!',
        description: state.message,
        variant: 'default',
      });

      // Clear the prompt and navigate to the generated image
      setPrompt('');
      if (state.imageId) {
        router.push(`/images/${state.imageId}`);
      }
    } else {
      // Show error toast
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, router]);

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    // Trigger form submission
    formRef.current?.requestSubmit();
  };

  return (
    <motion.div
      className="sticky inset-x-0 bottom-0 mx-auto max-w-3xl px-3 pb-3 md:px-5 md:pb-5"
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : 100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
    >
      <form ref={formRef} action={formAction}>
        <input type="hidden" name="prompt" value={prompt} />
        <PromptInput
          isLoading={isPending}
          value={prompt}
          onValueChange={setPrompt}
          onSubmit={handleSubmit}
          className="border-input bg-popover relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs"
        >
          <div className="flex flex-col">
            <PromptInputTextarea
              placeholder="Ask anything"
              className="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
            />

            <PromptInputActions className="mt-5 flex w-full items-center justify-between gap-2 px-3 pb-3">
              <div className="flex items-center gap-2">
                <PromptInputAction tooltip="Add a new action">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-9 rounded-full"
                  >
                    <Plus size={18} />
                  </Button>
                </PromptInputAction>

                <PromptInputAction tooltip="Search">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                  >
                    <Globe size={18} />
                    Search
                  </Button>
                </PromptInputAction>

                <PromptInputAction tooltip="More actions">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-9 rounded-full"
                  >
                    <MoreHorizontal size={18} />
                  </Button>
                </PromptInputAction>
              </div>
              <div className="flex items-center gap-2">
                <PromptInputAction tooltip="Voice input">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-9 rounded-full"
                  >
                    <Mic size={18} />
                  </Button>
                </PromptInputAction>

                <Button
                  type="submit"
                  size="icon"
                  disabled={!prompt.trim() || isPending}
                  className="size-9 rounded-full"
                >
                  {!isPending ? (
                    <ArrowUp size={18} />
                  ) : (
                    <span className="size-3 rounded-xs bg-white" />
                  )}
                </Button>
              </div>
            </PromptInputActions>
          </div>
        </PromptInput>
      </form>
    </motion.div>
  );
}

export { PromptInputWithActions };
