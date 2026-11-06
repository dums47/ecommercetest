"use client";

import Link from "next/link";
import { ShoppingBag, Sparkles, Layers, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  cartCount?: number;
}

export function Header({ cartCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm transition-transform group-hover:scale-105 dark:bg-white dark:text-zinc-950">
              <Layers className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                COHORT<span className="text-indigo-600 dark:text-indigo-400">.</span>STORE
              </span>
              <span className="text-[10px] uppercase font-medium tracking-wider text-zinc-400 -mt-1">
                Mock Commerce
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg hover:text-zinc-900 hover:bg-zinc-100 transition-colors dark:hover:text-white dark:hover:bg-zinc-800"
            >
              Catalog
            </Link>
            <Link
              href="/api/products"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/50 transition-colors"
            >
              <span>Feed API</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>

        {/* Dedicated container slot ready for external search widget */}

        <div className="flex-1 max-w-xl mx-4 sm:mx-8">
          <div
            id="ai-search-widget"
            className="w-full min-h-[40px] flex items-center transition-all duration-200"
            data-testid="ai-search-widget-slot"
          >
           
            {/* Fallback placeholder visual prior to external script mounting into #ai-search-widget */}
            <div className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-zinc-400 bg-zinc-50 hover:bg-zinc-100/80 border border-dashed border-zinc-300 rounded-xl transition-all dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800/80">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
              <span className="truncate">
                
               // External search widget slot (<code className="font-mono text-[11px] text-zinc-600 dark:text-zinc-300">#ai-search-widget</code>)
              </span>
              <span className="ml-auto text-[10px] uppercase tracking-wider font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-200/50 dark:border-indigo-800/50">
                Mount Target
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          <Link
            href="/api/products"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>GET /api/products</span>
          </Link>

          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 transition dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
