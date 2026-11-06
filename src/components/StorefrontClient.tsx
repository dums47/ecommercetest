"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { CatalogFilters } from "@/components/CatalogFilters";
import { Header } from "@/components/Header";
import {
  Sparkles,
  Database,
  ArrowRight,
  ExternalLink,
  PackageSearch,
  Code2,
} from "lucide-react";

interface StorefrontClientProps {
  initialProducts: Product[];
}

export function StorefrontClient({ initialProducts }: StorefrontClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
      );
    }

    // In Stock Only
    if (inStockOnly) {
      result = result.filter((p) => p.stockCount > 0);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "stock-desc":
        result.sort((a, b) => b.stockCount - a.stockCount);
        break;
      default:
        // Keep original order
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans">
      {/* Navigation Header with #ai-search-widget slot */}
      <Header cartCount={cartItems.length} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200/60 bg-gradient-to-b from-indigo-50/40 via-white to-zinc-50/20 py-12 sm:py-16 dark:border-zinc-800/60 dark:from-indigo-950/20 dark:via-zinc-950 dark:to-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/60 dark:text-indigo-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Next.js App Router &bull; SQLite Prisma Store</span>
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-zinc-900 dark:text-zinc-50">
                Premium Hardware &amp; Essentials
              </h1>

              <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
                A standalone mock e-commerce store backed by a local SQLite
                database. Built with real-time stock counts, categorized products,
                and an AI search widget mount slot.
              </p>

              {/* Quick stats badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <Database className="h-4 w-4 text-emerald-500" />
                  <span>SQLite Local Database ({products.length} Items)</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  <span>External Search Slot Ready</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  <Code2 className="h-4 w-4 text-amber-500" />
                  <span>Public Ingestion Feed Enabled</span>
                </div>
              </div>
            </div>

            {/* Catalog Feed API Callout Card */}
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 max-w-md w-full">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Store Public Catalog Feed
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live API
                </span>
              </div>

              <div className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                <p>
                  External crawlers or AI agents can ingest the entire mock
                  catalog via JSON:
                </p>
                <div className="flex items-center justify-between rounded-xl bg-zinc-950 px-3.5 py-2.5 font-mono text-[11px] text-zinc-200 border border-zinc-800">
                  <span className="text-emerald-400 font-semibold">GET</span>
                  <span className="text-zinc-300">/api/products</span>
                  <a
                    href="/api/products"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-sans font-medium"
                  >
                    <span>Test</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Product Grid Section */}
      <main className="mx-auto max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Filters and Controls */}
        <div className="mb-8">
          <CatalogFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            inStockOnly={inStockOnly}
            onInStockToggle={setInStockOnly}
            totalFiltered={filteredProducts.length}
          />
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 py-16 px-4 text-center">
            <PackageSearch className="h-12 w-12 text-zinc-400 mb-3" />
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              No products found
            </h3>
            <p className="mt-1 text-xs text-zinc-500 max-w-sm">
              We couldn&apos;t find any items matching &ldquo;{searchQuery}&rdquo; in category &ldquo;{selectedCategory}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setInStockOnly(false);
              }}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Reset filters</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-950 py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} COHORT Mock Store. Powered by Next.js &amp; Prisma SQLite.</p>
          <div className="flex items-center gap-4">
            <a
              href="/api/products"
              target="_blank"
              className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition"
            >
              Public Catalog Feed
            </a>
            <span className="text-zinc-300 dark:text-zinc-700">&bull;</span>
            <span className="font-mono text-[11px] text-zinc-400">
              Widget target: #ai-search-widget
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
