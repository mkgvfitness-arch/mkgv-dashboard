import Topbar from "@/components/Topbar";
import AddGastoForm from "@/components/AddGastoForm";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function GastosPage() {
  const gastos = await prisma.gasto.findMany({ orderBy: { fecha: "desc" } });

  return (
    <>
      <Topbar title="Gastos" subtitle={`${gastos.length} gastos registrados`} />
      <main className="flex-1 space-y-4 p-6">
        <AddGastoForm />
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Fecha</th>
                <th className="px-5 py-3 font-medium">Concepto</th>
                <th className="px-5 py-3 font-medium">Categoria</th>
                <th className="px-5 py-3 font-medium text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {gastos.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-6 text-center text-gray-400">
                    Todavia no hay gastos.
                  </td>
                </tr>
              )}
              {gastos.map((g) => (
                <tr key={g.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 text-gray-600">{formatDate(g.fecha)}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{g.concepto}</td>
                  <td className="px-5 py-3 text-gray-600">{g.categoria || "-"}</td>
                  <td className="px-5 py-3 text-right font-medium text-gray-900">
                    {formatCurrency(Number(g.monto))}
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
