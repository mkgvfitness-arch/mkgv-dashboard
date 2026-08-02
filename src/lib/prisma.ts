import { PrismaClient } from "@prisma/client";

// Evita crear multiples instancias de PrismaClient en desarrollo
// (Next.js recarga los modulos en cada cambio).
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
