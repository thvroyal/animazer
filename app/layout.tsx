import { FlashMessage } from '@/components/flash-message';
import { Toaster } from '@/components/ui/toaster';
import { getFlashMessage } from '@/utils/flash-message';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const defaultUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  ? `https://${process.env.NEXT_PUBLIC_WEBSITE_URL}`
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
          {children}
          <Toaster />
          <FlashMessage flashMessage={flashMessage} />
        </ThemeProvider>
      </body>
    </html>
  );
}
