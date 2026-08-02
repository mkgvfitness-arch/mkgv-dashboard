import { Users, ShoppingCart, Package, Wallet } from "lucide-react";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";

async function getStats() {
  const [totalClientes, totalProductos, ventas, gastos] = await Promise.all([
    prisma.cliente.count(),
    prisma.producto.count(),
    prisma.venta.findMany({
      include: { cliente: true, producto: true },
      orderBy: { fecha: "desc" },
      take: 5,
    }),
    prisma.gasto.aggregate({ _sum: { monto: true } }),
  ]);

  const ingresosAgg = await prisma.venta.aggregate({
    _sum: { total: true },
    where: { estado: "PAGADA" },
  });

  return {
    totalClientes,
    totalProductos,
    ventasRecientes: ventas,
    totalIngresos: ingresosAgg._sum.total ?? 0,
    totalGastos: gastos._sum.monto ?? 0,
  };
}

export default async function DashboardPage() {
  const stats = await getStats();
  const balance = Number(stats.totalIngresos) - Number(stats.totalGastos);

  return (
    <>
      <Topbar title="Panel de gestion" subtitle="Resumen general del negocio" />
      <main className="flex-1 space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Clientes" value={String(stats.totalClientes)} icon={Users} />
          <StatCard label="Productos / servicios" value={String(stats.totalProductos)} icon={Package} />
          <StatCard label="Ingresos (pagados)" value={formatCurrency(Number(stats.totalIngresos))} icon={ShoppingCart} />
          <StatCard label="Balance (ingresos - gastos)" value={formatCurrency(balance)} icon={Wallet} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold text-gray-900">Ultimas ventas</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Fecha</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Producto</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {stats.ventasRecientes.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-6 text-center text-gray-400">
                    Todavia no hay ventas. Ejecuta "npm run db:seed" para cargar datos de ejemplo.
                  </td>
                </tr>
              )}
              {stats.ventasRecientes.map((v) => (
                <tr key={v.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-gray-600">{formatDate(v.fecha)}</td>
                  <td className="px-5 py-3 text-gray-900">{v.cliente.nombre}</td>
                  <td className="px-5 py-3 text-gray-600">{v.producto.nombre}</td>
                  <td className="px-5 py-3 text-gray-600">{v.estado}</td>
                  <td className="px-5 py-3 text-right font-medium text-gray-900">
                    {formatCurrency(Number(v.total))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
