import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.venta.deleteMany();
  await prisma.gasto.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.producto.deleteMany();

  const clientes = await Promise.all(
    [
      { nombre: "Laura Gomez", email: "laura@example.com", telefono: "600111222" },
      { nombre: "Carlos Ruiz", email: "carlos@example.com", telefono: "600333444" },
      { nombre: "Marta Diaz", email: "marta@example.com", telefono: "600555666" },
    ].map((c) => prisma.cliente.create({ data: c }))
  );

  const productos = await Promise.all(
    [
      { nombre: "Plan Online 1 mes", precio: 49.99, stock: 999, categoria: "Suscripcion" },
      { nombre: "Plan Online 3 meses", precio: 129.99, stock: 999, categoria: "Suscripcion" },
      { nombre: "Asesoria nutricional", precio: 79.0, stock: 999, categoria: "Servicio" },
    ].map((p) => prisma.producto.create({ data: p }))
  );

  await prisma.venta.create({
    data: {
      clienteId: clientes[0].id,
      productoId: productos[0].id,
      cantidad: 1,
      precioUnit: productos[0].precio,
      total: productos[0].precio,
      estado: "PAGADA",
    },
  });

  await prisma.venta.create({
    data: {
      clienteId: clientes[1].id,
      productoId: productos[1].id,
      cantidad: 1,
      precioUnit: productos[1].precio,
      total: productos[1].precio,
      estado: "PENDIENTE",
    },
  });

  await prisma.gasto.create({
    data: { concepto: "Publicidad Instagram", monto: 120, categoria: "Marketing" },
  });

  console.log("Seed completado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
