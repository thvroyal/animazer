import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/40 transition-colors">
      <div className="border bg-background rounded-lg flex items-center justify-center p-4">
        <Loader className="text-primary animate-spin" size={32} />
      </div>
    </div>
  );
}
