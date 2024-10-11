import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';

export default function AppLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Header />
        <div className="flex flex-col gap-20 container">
          {children}
          {modal}
        </div>
        <Footer />
      </div>
    </main>
  );
}
