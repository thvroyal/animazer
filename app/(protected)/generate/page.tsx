'use client';

import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { generate } from '@/app/actions/images';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
  error: null,
};

export default function GeneratePage() {
  const [state, formAction] = useFormState(generate, initialState);
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Generate</h1>
      <form action={formAction} className="flex flex-col gap-4">
        <Input
          name="prompt"
          placeholder="Enter your prompt"
          className="w-full"
        />
        <SubmitButton>Generate</SubmitButton>
      </form>
      {!!state.error && (
        <p className="text-destructive p-2 rounded-lg text-sm">
          {state.error}
        </p>
      )}
    </main>
  );
}
