import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { StorefrontClient } from "@/components/StorefrontClient";

export const instant = false;

async function ProductCatalog() {
  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  try {
    products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.warn("Could not query products from SQLite:", error);
    products = [];
  }

  const serializedProducts = products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    price: Number(p.price),
    category: p.category,
    sku: p.sku,
    stockCount: Number(p.stockCount),
    imageUrl: p.imageUrl,
    createdAt: p.createdAt ? p.createdAt.toISOString() : undefined,
    updatedAt: p.updatedAt ? p.updatedAt.toISOString() : undefined,
  }));

  return <StorefrontClient initialProducts={serializedProducts} />;
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            <span className="text-xs font-medium text-zinc-500">
              Loading store catalog...
            </span>
          </div>
        </div>
      }
    >
      <ProductCatalog />
    </Suspense>
  );
}
