import { Toaster } from '@/components/ui/toaster';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const defaultUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
  ? `https://${process.env.NEXT_PUBLIC_WEBSITE_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Unreal - AI-Generated Images',
  description:
    'Create stunning AI-generated images with various styles including anime, hand drawing, cartoon, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        </ThemeProvider>
      </body>
    </html>
  );
}
