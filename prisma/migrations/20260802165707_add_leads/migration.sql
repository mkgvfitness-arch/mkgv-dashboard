-- CreateEnum
CREATE TYPE "EstadoLead" AS ENUM ('AGENDADA', 'PRELLAMADA_HECHA', 'REALIZADA', 'CANCELADA', 'NO_SHOW', 'CERRADA', 'PENDIENTE_DECISION', 'DESCARTADA', 'DESCARTADA_FUTURO');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "origen" TEXT,
    "fechaLlamada" TIMESTAMP(3),
    "prellamadaHecha" BOOLEAN NOT NULL DEFAULT false,
    "estado" "EstadoLead" NOT NULL DEFAULT 'AGENDADA',
    "fechaSeguimiento" TIMESTAMP(3),
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_estado_idx" ON "Lead"("estado");

-- CreateIndex
CREATE INDEX "Lead_fechaLlamada_idx" ON "Lead"("fechaLlamada");
