import { prisma } from "@/lib/prisma";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(request: Request) {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { id: true, updatedAt: true },
    orderBy: { id: "asc" },
  });

  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  const siteUrl = new URL(configuredSiteUrl ?? request.url).origin;
  const urls = [
    `<url><loc>${escapeXml(new URL("/", siteUrl).toString())}</loc></url>`,
    ...products.map((product) => {
      const location = new URL(
        `/products/${encodeURIComponent(product.id)}`,
        siteUrl
      ).toString();
      return `<url><loc>${escapeXml(location)}</loc><lastmod>${product.updatedAt.toISOString()}</lastmod></url>`;
    }),
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
