import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import {cn} from '@/lib/utils'
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProductProvider } from "@/contexts/ProductContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { Analytics } from "@vercel/analytics/react"

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
      <ProductProvider>
        <SearchProvider>
          <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <body className={cn("", fontsans.variable)}>
              {children}
              <Analytics/>
            </body>
          </ThemeProvider>
        </SearchProvider>
      </ProductProvider>
      
      
    </html>
  );
}
