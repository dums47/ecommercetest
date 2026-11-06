"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { ShoppingCart, Check, Tag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAdd = () => {
    setIsAdded(true);
    if (onAddToCart) {
      onAddToCart(product);
    }
    setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  };

  const isLowStock = product.stockCount <= 25;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-900">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {!imgError ? (
          <Link
            href={`/products/${encodeURIComponent(product.id)}`}
            aria-label={`View ${product.title}`}
            className="block h-full"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ) : (
          <Link
            href={`/products/${encodeURIComponent(product.id)}`}
            aria-label={`View ${product.title}`}
            className="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
          >
            <span className="text-sm font-medium">No Image Available</span>
          </Link>
        )}

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-semibold text-zinc-800 shadow-sm dark:bg-zinc-900/90 dark:text-zinc-200">
          <Tag className="h-3 w-3 text-indigo-500" />
          <span>{product.category}</span>
        </div>

        {/* Stock status badge */}
        <div className="absolute top-3 right-3">
          {product.stockCount === 0 ? (
            <span className="rounded-full bg-rose-500/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Out of stock
            </span>
          ) : isLowStock ? (
            <span className="rounded-full bg-amber-500/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              Only {product.stockCount} left
            </span>
          ) : (
            <span className="rounded-full bg-emerald-500/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
              In Stock ({product.stockCount})
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
          <span>{product.sku}</span>
          <span className="text-[10px] uppercase font-semibold text-zinc-500">
            ID: {product.id.slice(-6)}
          </span>
        </div>

        <h3 className="text-base font-semibold text-zinc-900 line-clamp-1 group-hover:text-indigo-600 transition-colors dark:text-zinc-100 dark:group-hover:text-indigo-400">
          <Link href={`/products/${encodeURIComponent(product.id)}`}>
            {product.title}
          </Link>
        </h3>

        <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed dark:text-zinc-400">
          {product.description}
        </p>

        {/* Bottom Bar: Price & Add Button */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-medium text-zinc-400">Price</span>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
              isAdded
                ? "bg-emerald-600 text-white shadow-emerald-500/20 shadow-md"
                : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95 shadow-sm dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
