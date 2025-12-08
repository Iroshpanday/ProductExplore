// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ReduxProvider from "@/components/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopHub - Your Premium E-Commerce Destination",
  description:
    "Discover amazing products at unbeatable prices. Browse our curated collection of premium items.",
  keywords: "e-commerce, shopping, products, online store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script to prevent flashing */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const stored = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                  if (stored === 'dark' || (!stored && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch {}
              })();
            `,
          }}
        />
      </head>

      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}
      >
        {/* Redux + Store providers */}
        <ReduxProvider>
          
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          
        </ReduxProvider>
      </body>
    </html>
  );
}
