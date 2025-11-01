"use client";
import React from "react";
import { useLiked } from "@/context/LikedContext";
import Link from "next/link";

export default function LikedPage() {
  const { liked, toggleLike } = useLiked();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Liked Items</h1>
        <Link href="/products" className="text-sm text-blue-600">Back to Products</Link>
      </div>

      {liked.length === 0 ? (
        <div className="text-gray-500">No liked items yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {liked.map((p) => (
            <div key={p.id} className="bg-white border rounded-lg p-3">
              <img src={p.image} alt={p.title} className="w-full h-44 object-cover rounded" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">{p.title}</div>
                  <div className="text-xs text-gray-500">₹{p.price ? p.price.toLocaleString() : "—"}</div>
                </div>
                <button onClick={() => toggleLike(p)} className="text-red-500 text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
