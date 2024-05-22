import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Two 1/2 Dimensions",
  description: "Layout Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"font-nohemi text-black"}>
        <Navbar />
        <div className="mt-6">{children}</div>
      </body>
    </html>
  );
}
