"use client";
import Link from "next/link";
import { ShoppingCart, Home, PackageSearch } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function Navbar() {
  const { cartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md">
      <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
        <PackageSearch className="w-7 h-7 text-blue-400" />
        Sneakify Store
      </Link>

      <div className="flex gap-8 items-center text-lg font-medium">
        <Link href="/" className="flex items-center gap-1 hover:text-blue-400 transition">
          <Home className="w-5 h-5" /> Home
        </Link>

        <Link href="/products" className="flex items-center gap-1 hover:text-blue-400 transition">
          <PackageSearch className="w-5 h-5" /> Products
        </Link>

        <Link href="/liked" className="flex items-center gap-2 hover:text-blue-400 transition">
          <Heart className="w-5 h-5" /> Liked
        </Link>

        <Link href="/cart" className="flex items-center gap-1 hover:text-blue-400 transition relative">
          <ShoppingCart className="w-5 h-5" />
          <span>Cart</span>
          {mounted && cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
