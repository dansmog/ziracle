import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const epilogueSans = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const openSauceSans = localFont({
  src: "../fonts/OpenSauceSans-Medium.ttf",
  display: "swap",
  variable: "--font-openSauceSans",
});

export const metadata: Metadata = {
  title: "Unlocking Edinburgh Student Discounts",
  description: `Find the best spots. Unlock student discounts. Earn points — and free
          lunches — by inviting friends.`,
  openGraph: {
    title: "Unlocking Edinburgh Student Discounts",
    description:
      "Find the best spots. Unlock student discounts. Earn points — and free lunches — by inviting friends.",
    url: "https://www.ziracle.com",
    siteName: "Ziracle",
    images: [
      {
        url: "https://ziracle.com/OGImage.png", // must be absolute URL
        width: 1200,
        height: 630,
        alt: "Unlocking Edinburgh Student Discounts",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${epilogueSans.variable} ${openSauceSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
