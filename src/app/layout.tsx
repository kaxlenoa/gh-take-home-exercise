import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { OrderProvider } from '@/context/OrderContext'
import OrderSummary from "./components/OrderSummary";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from 'sonner'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GH",
  description: "Enjoy your shopping!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <OrderProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <OrderSummary />
          <Toaster position="top-center" />
        </OrderProvider>
      </body>
    </html>
  );
}
