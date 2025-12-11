import { DM_Sans } from 'next/font/google';
import Footer from "@/app/component/Footer/page";
import "./globals.scss";
import Navbar from "@/app/component/Navbar/page";

// Configure DM Sans font
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = {
  title: "Newton Computers | Laptop Sales & Services",
  description: "Professional laptop sales, repairs, and IT services by Newton Computers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <body className="antialiased bg-gray-50 text-gray-900">
        <Navbar />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}