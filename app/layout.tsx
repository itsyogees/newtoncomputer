import type { Metadata } from "next";
import Footer from "@/app/component/Footer/page";
import "./globals.scss";
import Navbar from "@/app/component/Navbar/page";

export const metadata: Metadata = {
  title: "Newton Computers | Laptop Sales & Services",
  description: "Professional laptop sales, repairs, and IT services by Newton Computers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 text-gray-900">
        <Navbar />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
