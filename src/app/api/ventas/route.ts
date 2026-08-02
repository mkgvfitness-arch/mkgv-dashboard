import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const ventas = await prisma.venta.findMany({
    include: { cliente: true, producto: true },
    orderBy: { fecha: "desc" },
  });
  return NextResponse.json(ventas);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.clienteId || !body.productoId) {
    return NextResponse.json({ error: "Cliente y producto son obligatorios" }, { status: 400 });
  }

  const producto = await prisma.producto.findUnique({ where: { id: body.productoId } });
  if (!producto) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  const cantidad = body.cantidad ? parseInt(body.cantidad, 10) : 1;
  const precioUnit = Number(producto.precio);
  const total = precioUnit * cantidad;

  const venta = await prisma.venta.create({
    data: {
      clienteId: body.clienteId,
      productoId: body.productoId,
      cantidad,
      precioUnit,
      total,
      estado: body.estado || "PAGADA",
    },
    include: { cliente: true, producto: true },
  });

  return NextResponse.json(venta, { status: 201 });
}
