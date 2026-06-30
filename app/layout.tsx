import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Container from "@/components/global/Container";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Next Store",
  description: "A nifty store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <Navbar />
            <Container className="py-10">{children}</Container>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
