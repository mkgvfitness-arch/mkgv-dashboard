import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const data: Record<string, unknown> = {};
  if (body.estado !== undefined) data.estado = body.estado;
  if (body.prellamadaHecha !== undefined) data.prellamadaHecha = body.prellamadaHecha;
  if (body.fechaSeguimiento !== undefined) {
    data.fechaSeguimiento = body.fechaSeguimiento ? new Date(body.fechaSeguimiento) : null;
  }
  if (body.notas !== undefined) data.notas = body.notas;

  const lead = await prisma.lead.update({
    where: { id: params.id },
    data,
  });

  return NextResponse.json(lead);
}
