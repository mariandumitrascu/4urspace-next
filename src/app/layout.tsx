import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/fonts.css";
import "./css/page.css";
import "./css/ipage.css";
import "./css/site.css";
import "./css/base_styles.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "4URSPACE is the Professional Network for the Commercial Construction Industry",
  description: "4URSPACE - Search brands, locations and vendors in the retail world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
