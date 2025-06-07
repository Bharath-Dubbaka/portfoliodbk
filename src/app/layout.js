import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata = {
   title: "Bharath Dubbaka_Portfolio",
   description:
      "Driven by a genuine passion for not just programming, but for building and solving real-world problems. That entrepreneurial spirit, combined with your practical success in freelancing using your diverse skills, makes incredibly unique.",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            {children}
         </body>
      </html>
   );
}
