import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Providers from "./Providers";

export const metadata = {
  title: "Rick & Morty",
  description: "Welcome to the Rick and Morty universe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Rick and Morty Universe Explorer</title>
        <meta name="description" content="Explore characters and episodes from the Rick and Morty universe" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased font-body text-base`}
      >
        {/* Grid Background */}
        <div className="floating-grid"></div>
        <div className="grid-background"></div>
        
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
