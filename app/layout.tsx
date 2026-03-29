import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";
import { AxiosContextProvider } from "@/context/AxiosContext";
import Wrapper from "./wrapper";
import Script from "next/script";

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
  title: "Vartalaap",
  description: "An AI-based language learning platform designed to be your personal assistant in mastering a new language. Preparing for competitive exams like TOEFL, IELTS etc.? Want to improve your professional soft skills? Or maybe you just want to communicate better? Look no further. Our innovative AI-powered tool ensures that you receive the best learning experience tailored to your individual needs.",
  icons: {
    icon: "/images/icons/logo.png",
    shortcut: "/images/icons/logo.png",
    apple: "/images/icons/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("Number of times rendering");

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-head">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id=GTM-PCHH5RVH'+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PCHH5RVH');
          `}
        </Script>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PCHH5RVH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <AxiosContextProvider>
          <AuthProvider>
            <Wrapper>
              <div className="min-h-screen">
                {children}
                <Toaster />
              </div>
            </Wrapper>
          </AuthProvider>
        </AxiosContextProvider>
      </body>
    </html>
  );
}
