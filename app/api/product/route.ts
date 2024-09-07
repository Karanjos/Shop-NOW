import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await req.json();
  const { name, description, price, brand, category, inStock, images } = body;
  console.log(typeof price);

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price,
      brand,
      category,
      inStock,
      images,
    },
  });

  return NextResponse.json(product);
}

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await req.json();
  const { id, inStock } = body;

  const product = await prisma.product.update({
    where: { id },
    data: {
      inStock,
    },
  });

  return NextResponse.json(product);
}
