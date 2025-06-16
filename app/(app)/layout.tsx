import { AppSidebar } from '@/components/app-sidebar';
import { PromptInputWithActions } from '@/components/prompt-input';
import { SidebarProvider } from '@/components/ui/sidebar';
import StickyAuthButton from '@/components/sticky-auth-button';

export default function AppLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full">
        <div className="h-full w-full relative">
          {children}
          <PromptInputWithActions />
          {modal}
        </div>
      </main>
      <StickyAuthButton />
    </SidebarProvider>
  );
}
