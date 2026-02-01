import { Geist, Geist_Mono, Londrina_Outline } from "next/font/google";
import "./globals.css";
import WidthTracker from "@/components/common/layout/widthTracker/WidthTracker";
import ComingSoonMode from "@/components/common/mode/comingsoon/ComingSoonMode";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const londrinaOutline = Londrina_Outline({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-londrina-outline", // 👈 REQUIRED
});

export const metadata = {
  title: "Buy Your Tickets Now!",
  description: "find your event and buy tickets easily with ticketguru",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#03131F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Your App Name" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
         ${londrinaOutline.variable} antialiased bg-white select-none`}
      >
        {process.env.COMING_SOON_MODE === "true" ? (
          <ComingSoonMode />
        ) : (
          children
        )}
        <WidthTracker />
      </body>
    </html>
  );
}
