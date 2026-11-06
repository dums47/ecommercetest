import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { prisma } from "@/lib/prisma";

export const instant = false;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id, isActive: true },
  });

  if (!product) {
    notFound();
  }

  const productJsonLd = JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.imageUrl,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability:
        product.stockCount > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  }).replace(/</g, "\\u003c");

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50/50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd }}
      />
      <Header />
      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full max-h-[600px] min-h-80 w-full object-cover"
          />
        </div>
        <section className="flex flex-col justify-center">
          <Link
            href="/"
            className="mb-6 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            &larr; Back to catalog
          </Link>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.title}
          </h1>
          <p className="mt-3 font-mono text-sm text-zinc-500">
            SKU: {product.sku}
          </p>
          <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-300">
            {product.description}
          </p>
          <p className="mt-8 text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p
            className={`mt-2 text-sm font-medium ${
              product.stockCount > 0
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {product.stockCount > 0 ? "In stock" : "Out of stock"}
          </p>
        </section>
      </main>
    </div>
  );
}
