import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Barlow, Inter, Poppins } from "next/font/google";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

const barlow = Barlow({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700", "800", "900"],
   variable: "--font-barlow",
   display: "swap",
});
const inter = Inter({
   subsets: ["latin"],
   variable: "--font-inter",
   display: "swap",
});

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700", "800"],
   variable: "--font-poppins",
   display: "swap",
});

export default function RootLayout({ children }) {
   return (
      <html
         lang="en"
         className={`${barlow.variable} ${inter.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
         <body className={barlow.className}>{children}</body>
      </html>
   );
}
