import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://askep-anak.com";

export const metadata: Metadata = {
  title: "Asuhan Keperawatan Anak",
  description:
    "Layanan informasi dan pengkajian keperawatan anak oleh tenaga perawat profesional.",
  metadataBase: new URL(baseUrl),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  openGraph: {
    title: "Asuhan Keperawatan Anak",
    description:
      "Layanan informasi dan pengkajian keperawatan anak oleh tenaga perawat profesional.",
    url: "/",
    siteName: "Asuhan Keperawatan Anak",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/mengasuh.jpg",
        width: 1200,
        height: 630,
        alt: "Ilustrasi Asuhan Keperawatan Anak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asuhan Keperawatan Anak",
    description:
      "Layanan informasi dan pengkajian keperawatan anak oleh tenaga perawat profesional.",
    images: ["/mengasuh.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}