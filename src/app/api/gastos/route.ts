import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const gastos = await prisma.gasto.findMany({ orderBy: { fecha: "desc" } });
  return NextResponse.json(gastos);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.concepto || body.monto === undefined) {
    return NextResponse.json({ error: "Concepto y monto son obligatorios" }, { status: 400 });
  }

  const gasto = await prisma.gasto.create({
    data: {
      concepto: body.concepto,
      monto: parseFloat(body.monto),
      categoria: body.categoria || null,
    },
  });

  return NextResponse.json(gasto, { status: 201 });
}
