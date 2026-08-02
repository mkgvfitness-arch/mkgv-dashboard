import Topbar from "@/components/Topbar";
import AddLeadForm from "@/components/AddLeadForm";
import LeadRow from "@/components/LeadRow";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LlamadasPage() {
  const leads = await prisma.lead.findMany({ orderBy: { fechaLlamada: "asc" } });

  return (
    <>
      <Topbar title="Llamadas" subtitle={`${leads.length} leads en el proceso`} />
      <main className="flex-1 space-y-4 p-6">
        <AddLeadForm />
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Telefono</th>
                <th className="px-4 py-3 font-medium">Origen</th>
                <th className="px-4 py-3 font-medium">Fecha llamada</th>
                <th className="px-4 py-3 font-medium text-center">Prellamada</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Seguimiento</th>
                <th className="px-4 py-3 font-medium">Notas</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                    Todavia no hay leads registrados.
                  </td>
                </tr>
              )}
              {leads.map((lead) => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
