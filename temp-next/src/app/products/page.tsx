"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useLiked } from "@/context/LikedContext";
import { Heart, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductsPage() {
  const { addToCart } = useCart();
  const { isLiked, toggleLike } = useLiked();
  const [filterOpen, setFilterOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      title: "Nike Air Max 270",
      price: 1799,
      image: "https://images.unsplash.com/photo-1606813902769-1e6e4a52b1b4?w=1200&q=80",
    },
    {
      id: 2,
      title: "Adidas Ultraboost 22",
      price: 1899,
      image: "https://images.unsplash.com/photo-1606813902627-57c05d4d7d4c?w=1200&q=80",
    },
    {
      id: 3,
      title: "Puma RS-X Reinvention",
      price: 1499,
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&q=80",
    },
    {
      id: 4,
      title: "Reebok Classic Leather",
      price: 1199,
      image: "https://images.unsplash.com/photo-1588361861040-4e55b1a37b9b?w=1200&q=80",
    },
    {
      id: 5,
      title: "New Balance 327",
      price: 1349,
      image: "https://images.unsplash.com/photo-1606813895612-5a98c45c9c13?w=1200&q=80",
    },
    {
      id: 6,
      title: "Converse Chuck Taylor",
      price: 899,
      image: "https://images.unsplash.com/photo-1528701800489-20be3c2a94cb?w=1200&q=80",
    },
    {
      id: 7,
      title: "Vans Old Skool",
      price: 999,
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&q=80",
    },
    {
      id: 8,
      title: "Jordan Retro 1",
      price: 1999,
      image: "https://images.unsplash.com/photo-1606813902854-d0eae2f4adf1?w=1200&q=80",
    },
    {
      id: 9,
      title: "ASICS Gel-Lyte III",
      price: 1249,
      image: "https://images.unsplash.com/photo-1618354691438-4a0b4cb60b25?w=1200&q=80",
    },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Listing Page</h1>
        <button
          onClick={() => setFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          filterOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          <button onClick={() => setFilterOpen(false)}>
            <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Brand</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><input type="checkbox" className="mr-2" /> Nike</li>
              <li><input type="checkbox" className="mr-2" /> Adidas</li>
              <li><input type="checkbox" className="mr-2" /> Puma</li>
              <li><input type="checkbox" className="mr-2" /> Reebok</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Price Range</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><input type="checkbox" className="mr-2" /> ₹100–₹500</li>
              <li><input type="checkbox" className="mr-2" /> ₹501–₹1000</li>
              <li><input type="checkbox" className="mr-2" /> ₹1001–₹2000</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar open */}
      {filterOpen && (
        <div
          onClick={() => setFilterOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const liked = isLiked(product.id);
          return (
            <article
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <div className="relative w-full h-64 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleLike(product)}
                  aria-label="Like"
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  <Heart
                    className={`w-5 h-5 transition ${
                      liked ? "text-red-500 fill-red-500" : "text-gray-500"
                    }`}
                  />
                </button>
              </div>

              <div className="mt-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  Sign in or Create an account to see pricing
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.title,
                        price: product.price,
                        image: product.image,
                      })
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
