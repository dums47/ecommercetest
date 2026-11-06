"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface CatalogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onInStockToggle: (val: boolean) => void;
  totalFiltered: number;
}

export function CatalogFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  inStockOnly,
  onInStockToggle,
  totalFiltered,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => onSelectCategory("All")}
          className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
            selectedCategory === "All"
              ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-800"
          }`}
        >
          All Items
        </button>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-950"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Control Bar: Search Input, In-Stock checkbox, Sort dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Local Search input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter title, description, SKU..."
            className="w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-4 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          {/* Stock toggle */}
          <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockToggle(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900"
            />
            <span>In Stock only</span>
          </label>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-2.5 py-1.5 text-xs">
            <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-transparent text-zinc-700 dark:text-zinc-300 font-medium focus:outline-none cursor-pointer"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-asc">Alphabetical (A-Z)</option>
              <option value="stock-desc">Highest Stock</option>
            </select>
          </div>

          <span className="text-xs font-mono text-zinc-400 hidden lg:inline">
            {totalFiltered} {totalFiltered === 1 ? "result" : "results"}
          </span>
        </div>
      </div>
    </div>
  );
}
