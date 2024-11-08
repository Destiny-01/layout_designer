import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RootLayoutProvider from "@/contexts/RootLayoutContext";

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
        <RootLayoutProvider>
          <Navbar />
          <ToastContainer />
          <div className="lg:mt-6">{children}</div>
        </RootLayoutProvider>
      </body>
    </html>
  );
}
