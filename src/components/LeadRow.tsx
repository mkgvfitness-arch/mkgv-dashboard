"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/format";

const ESTADOS = [
  { value: "AGENDADA", label: "Agendada" },
  { value: "PRELLAMADA_HECHA", label: "Prellamada hecha" },
  { value: "REALIZADA", label: "Llamada realizada" },
  { value: "CANCELADA", label: "Cancelada" },
  { value: "NO_SHOW", label: "No show" },
  { value: "CERRADA", label: "Cerrada (cliente)" },
  { value: "PENDIENTE_DECISION", label: "Pendiente decision" },
  { value: "DESCARTADA", label: "Descartada" },
  { value: "DESCARTADA_FUTURO", label: "Descartada (mas adelante)" },
];

type Lead = {
  id: string;
  nombre: string;
  telefono: string | null;
  origen: string | null;
  fechaLlamada: Date | null;
  prellamadaHecha: boolean;
  estado: string;
  fechaSeguimiento: Date | null;
  notas: string | null;
};

export default function LeadRow({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function patch(data: Record<string, unknown>) {
    setSaving(true);
    try {
      await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-b border-gray-50 last:border-0">
      <td className="px-4 py-3 font-medium text-gray-900">{lead.nombre}</td>
      <td className="px-4 py-3 text-gray-600">{lead.telefono || "-"}</td>
      <td className="px-4 py-3 text-gray-600">{lead.origen || "-"}</td>
      <td className="px-4 py-3 text-gray-600">
        {lead.fechaLlamada ? formatDate(lead.fechaLlamada) : "-"}
      </td>
      <td className="px-4 py-3 text-center">
        <input
          type="checkbox"
          checked={lead.prellamadaHecha}
          disabled={saving}
          onChange={(e) => patch({ prellamadaHecha: e.target.checked })}
        />
      </td>
      <td className="px-4 py-3">
        <select
          value={lead.estado}
          disabled={saving}
          onChange={(e) => patch({ estado: e.target.value })}
          className="rounded-md border border-gray-300 px-2 py-1 text-xs"
        >
          {ESTADOS.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-3">
        <input
          key={`seg-${lead.id}-${lead.fechaSeguimiento ?? ""}`}
          type="date"
          disabled={saving}
          defaultValue={lead.fechaSeguimiento ? new Date(lead.fechaSeguimiento).toISOString().slice(0, 10) : ""}
          onChange={(e) => patch({ fechaSeguimiento: e.target.value || null })}
          className="rounded-md border border-gray-300 px-2 py-1 text-xs"
        />
      </td>
      <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">{lead.notas || "-"}</td>
    </tr>
  );
}
