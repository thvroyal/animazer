import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { generate } from './action';

export default function GeneratePage() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Generate</h1>
      <form action={generate} className="flex flex-col gap-4">
        <Input
          name="prompt"
          placeholder="Enter your prompt"
          className="w-full"
        />
        <SubmitButton>
          Generate
        </SubmitButton>
      </form>
    </main>
  );
}
