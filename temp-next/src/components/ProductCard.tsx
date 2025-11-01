"use client";
import React from "react";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { useLiked } from "@/context/LikedContext";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const { isLiked, toggleLike } = useLiked();
  const { addToCart } = useCart();
  const liked = isLiked(product.id);

  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
      <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <button
          onClick={() => toggleLike(product)}
          aria-label={liked ? "Unlike" : "Like"}
          className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full shadow hover:scale-105 transition"
        >
          <Heart
            className={`w-5 h-5 ${
              liked ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Sign in or Create an account to see pricing
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="text-sm font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </div>

          <button
            onClick={() => addToCart({ id: product.id, name: product.title, price: product.price, image: product.image })}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
