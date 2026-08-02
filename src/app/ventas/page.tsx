import Topbar from "@/components/Topbar";
import AddVentaForm from "@/components/AddVentaForm";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function VentasPage() {
  const [ventas, clientes, productos] = await Promise.all([
    prisma.venta.findMany({ include: { cliente: true, producto: true }, orderBy: { fecha: "desc" } }),
    prisma.cliente.findMany({ orderBy: { nombre: "asc" } }),
    prisma.producto.findMany({ orderBy: { nombre: "asc" } }),
  ]);

  return (
    <>
      <Topbar title="Ventas" subtitle={`${ventas.length} ventas registradas`} />
      <main className="flex-1 space-y-4 p-6">
        <AddVentaForm clientes={clientes} productos={productos} />
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Fecha</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Producto</th>
                <th className="px-5 py-3 font-medium">Cantidad</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-6 text-center text-gray-400">
                    Todavia no hay ventas.
                  </td>
                </tr>
              )}
              {ventas.map((v) => (
                <tr key={v.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-gray-600">{formatDate(v.fecha)}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{v.cliente.nombre}</td>
                  <td className="px-5 py-3 text-gray-600">{v.producto.nombre}</td>
                  <td className="px-5 py-3 text-gray-600">{v.cantidad}</td>
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
