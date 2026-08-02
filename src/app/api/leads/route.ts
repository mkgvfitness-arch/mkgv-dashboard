import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { fechaLlamada: "asc" } });
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.nombre) {
    return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      nombre: body.nombre,
      telefono: body.telefono || null,
      origen: body.origen || null,
      fechaLlamada: body.fechaLlamada ? new Date(body.fechaLlamada) : null,
      notas: body.notas || null,
    },
  });

  return NextResponse.json(lead, { status: 201 });
}
