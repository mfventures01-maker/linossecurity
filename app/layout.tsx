import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd, { generateOrganizationSchema } from "@/components/SEO/JsonLd";
import { BUSINESS_DETAILS } from "@/config/business";
import { aiSearchMetadata } from "./ai-search-metadata";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linos E Security | Nigeria's Trusted Security Automation Installers",
  description: "Elite security installation services in Abuja, Lagos, and Port Harcourt. CCTV, Access Control, Solar Power, and Gate Automation.",
  icons: {
    icon: '/logo.png',
  }
};

import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={generateOrganizationSchema(BUSINESS_DETAILS)} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aiSearchMetadata) }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
