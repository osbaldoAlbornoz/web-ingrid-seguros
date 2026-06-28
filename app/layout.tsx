import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ingrid Albornoz | Asesora Integral de Salud y Vida',
  description: 'Asesoría profesional en seguros de salud y vida. Protege tu futuro y el de tu familia con planes personalizados.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
