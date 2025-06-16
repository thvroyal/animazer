"use client"

import { useActionState, useEffect } from "react";
import { publicImage, type PublicImageResult } from "@/app/actions/images";
import { SubmitButton } from "./submit-button";
import { toast } from "@/hooks/use-toast";

interface PublicImageFormProps {
  imageId: string;
}

export function PublicImageForm({ imageId }: PublicImageFormProps) {
  const [state, formAction, isPending] = useActionState<PublicImageResult | null, FormData>(
    publicImage,
    null
  );

  // Handle the result state
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input hidden defaultValue={imageId} name="id" />
      <SubmitButton loading={isPending}>Public</SubmitButton>
    </form>
  );
} 