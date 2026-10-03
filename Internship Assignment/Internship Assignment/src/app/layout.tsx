import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Scroll-Driven McLaren 720S Hero Section | ItzFizz Experience',
  description: 'A smooth scroll-driven interactive hero section animation built with Next.js, React, Tailwind CSS, and GSAP ScrollTrigger.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090a0f] text-slate-100 antialiased overflow-x-hidden selection:bg-[#def54f] selection:text-black">
        {children}
      </body>
    </html>
  );
}
