import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { LikedProvider } from "@/context/LikedContext";

export const metadata = {
  title: "Sneakify Store",
  description: "Your sneaker shopping store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <CartProvider>
          <LikedProvider>
          <Navbar />
          <main className="p-6">{children}</main>
          </LikedProvider>
        </CartProvider>
      </body>
    </html>
  );
}
