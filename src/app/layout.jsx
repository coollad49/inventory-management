import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import {cn} from '@/lib/utils'
import { ThemeProvider } from "@/components/ThemeProvider";

const fontsans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans", 
  });

export const metadata = {
  title: "Track My Pastry",
  description: "App that tracks your pastry, inventory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className={cn("", fontsans.variable)}>{children}</body>
      </ThemeProvider>
      
    </html>
  );
}
