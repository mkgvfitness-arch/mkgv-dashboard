import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const productos = await prisma.producto.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(productos);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.nombre || body.precio === undefined) {
    return NextResponse.json({ error: "Nombre y precio son obligatorios" }, { status: 400 });
  }

  const producto = await prisma.producto.create({
    data: {
      nombre: body.nombre,
      descripcion: body.descripcion || null,
      precio: parseFloat(body.precio),
      stock: body.stock !== undefined ? parseInt(body.stock, 10) : 0,
      categoria: body.categoria || null,
    },
  });

  return NextResponse.json(producto, { status: 201 });
}
