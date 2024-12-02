import type { Metadata } from "next";
import localFont from "next/font/local";

import './globals.css'
import Header from "../components/Header";
import NextAuthProvider from "@/providers/NextAuthProvider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Inicio | BlackSharkWeb",
  description: "Página de inicio de BlackSharkWeb",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <NextAuthProvider>
        <Header />
        <main className="pt-28">
          {children}
        </main>
      </NextAuthProvider>
    </div>
  );
}
