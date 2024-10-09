import Header from '@/components/layouts/header';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Toaster } from '@/components/ui/toaster';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Footer from '@/components/layouts/footer';
import { FlashMessage } from '@/components/flash-message';
import { getFlashMessage } from '@/utils/flash-message';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Animazer - Generate the anime style image',
  description:
    'The collect of generated image with style anime, hand drawing, cartoon, ...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const flashMessage = getFlashMessage();
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <Header />
              <div className="flex flex-col gap-20 container">{children}</div>
              <Footer />
            </div>
          </main>
          <Toaster />
          <FlashMessage flashMessage={flashMessage} />
        </ThemeProvider>
      </body>
    </html>
  );
}
