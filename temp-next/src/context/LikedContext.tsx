"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type ProductLite = {
  id: number;
  title: string;
  price?: number;
  image: string;
};

type LikedContextType = {
  liked: ProductLite[];
  toggleLike: (p: ProductLite) => void;
  isLiked: (id: number) => boolean;
};

const LikedContext = createContext<LikedContextType | undefined>(undefined);

export const LikedProvider = ({ children }: { children: React.ReactNode }) => {
  const [liked, setLiked] = useState<ProductLite[]>(() => {
    try {
      if (typeof window !== "undefined") {
        const s = localStorage.getItem("likedItems");
        return s ? JSON.parse(s) : [];
      }
    } catch {}
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("likedItems", JSON.stringify(liked));
    } catch {}
  }, [liked]);

  const toggleLike = (p: ProductLite) => {
    setLiked((prev) => {
      const found = prev.find((x) => x.id === p.id);
      if (found) return prev.filter((x) => x.id !== p.id);
      return [...prev, p];
    });
  };

  const isLiked = (id: number) => liked.some((x) => x.id === id);

  return (
    <LikedContext.Provider value={{ liked, toggleLike, isLiked }}>
      {children}
    </LikedContext.Provider>
  );
};

export const useLiked = () => {
  const ctx = useContext(LikedContext);
  if (!ctx) throw new Error("useLiked must be inside LikedProvider");
  return ctx;
};
