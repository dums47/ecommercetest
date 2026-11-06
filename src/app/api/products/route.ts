import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    // Build filter criteria
    const where: Record<string, unknown> = { isActive: true };
    if (category && category !== "All" && category.toLowerCase() !== "all") {
      where.category = category;
    }
    if (query) {
      where.OR = [
        { title: { contains: query } },
        { description: { contains: query } },
        { category: { contains: query } },
        { sku: { contains: query } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(
      {
        success: true,
        total: products.length,
        products,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching product feed:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
