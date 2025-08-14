import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

// Main body font - clean and readable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

// Display font for headings and brand
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

// Monospace for technical elements
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});


export const metadata = {
  title: "Rick & Morty",
  description: "Welcome to the Rick & Morty universe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Rick and Morty Universe Explorer</title>
        <meta name="description" content="Explore characters and episodes from the Rick and Morty universe" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable} antialiased font-body text-base`}
      >
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
