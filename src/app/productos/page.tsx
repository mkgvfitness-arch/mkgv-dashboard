import Topbar from "@/components/Topbar";
import AddProductoForm from "@/components/AddProductoForm";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductosPage() {
  const productos = await prisma.producto.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <>
      <Topbar title="Productos y servicios" subtitle={`${productos.length} en catalogo`} />
      <main className="flex-1 space-y-4 p-6">
        <AddProductoForm />
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-5 py-3 font-medium">Nombre</th>
                <th className="px-5 py-3 font-medium">Categoria</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium text-right">Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-6 text-center text-gray-400">
                    Todavia no hay productos.
                  </td>
                </tr>
              )}
              {productos.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3 font-medium text-gray-900">{p.nombre}</td>
                  <td className="px-5 py-3 text-gray-600">{p.categoria || "-"}</td>
                  <td className="px-5 py-3 text-gray-600">{p.stock}</td>
                  <td className="px-5 py-3 text-right font-medium text-gray-900">
                    {formatCurrency(Number(p.precio))}
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
