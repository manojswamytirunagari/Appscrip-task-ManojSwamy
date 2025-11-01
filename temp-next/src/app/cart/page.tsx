"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();
  const [mounted, setMounted] = useState(false);

  //  Fix hydration: only render cart after mount
  useEffect(() => {
    //eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) {
    // Matches SSR HTML to prevent mismatch
    return <div className="p-8 text-center">Loading your cart...</div>;
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      <p className="mb-6">
        You have {cart.length} unique item(s) in your cart.
      </p>

      <ul className="space-y-4">
        {cart.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p>
                ₹{item.price} × {item.quantity} = ₹
                {item.price * item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg"
              >
                −
              </button>
              <span className="font-bold">{item.quantity}</span>
              <button
                onClick={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                  })
                }
                className="px-3 py-1 bg-green-600 text-white rounded-lg"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-xl font-semibold">
        🧾 Total Price: ₹{totalPrice}
      </div>

      <button
        onClick={clearCart}
        className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg"
      >
        Clear Cart
      </button>
    </div>
  );
}
