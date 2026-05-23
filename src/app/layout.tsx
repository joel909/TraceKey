import type { Metadata } from "next";
import { Space_Grotesk } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});



export const metadata: Metadata = {
  title: {
    default: "TraceKey",
    template: "%s | TraceKey",
  },
  description: "TraceKey analytics dashboard and event tracking platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={spaceGrotesk.className}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
