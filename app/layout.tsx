import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { FitLogProvider } from "./context/FitLogContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FitLog — Train With Intent. Log Every Set.",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} scroll-smooth dark`}
    >
      <body className="bg-black text-zinc-100 font-sans antialiased selection:bg-[#ccff00] selection:text-black min-h-screen">
        <FitLogProvider>
          <div className="max-w-[1290px] mx-auto min-h-screen bg-[#0e1014] border-x border-white/[0.04] flex flex-col">
            <Navbar />
            <div className="flex-1 w-full">{children}</div>
            <Footer />
          </div>
        </FitLogProvider>
      </body>
    </html>
  );
}