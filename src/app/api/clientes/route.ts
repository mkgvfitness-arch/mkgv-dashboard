import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const clientes = await prisma.cliente.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(clientes);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.nombre) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }

  const cliente = await prisma.cliente.create({
    data: {
      nombre: body.nombre,
      email: body.email || null,
      telefono: body.telefono || null,
      notas: body.notas || null,
    },
  });

  return NextResponse.json(cliente, { status: 201 });
}
