"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddLeadForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    origen: "Instagram",
    fechaLlamada: "",
    notas: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ nombre: "", telefono: "", origen: "Instagram", fechaLlamada: "", notas: "" });
        setOpen(false);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
      >
        + Nuevo lead
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Nombre</label>
        <input
          required
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Telefono</label>
        <input
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Origen</label>
        <select
          value={form.origen}
          onChange={(e) => setForm({ ...form, origen: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        >
          <option value="Instagram">Instagram</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Fecha y hora de llamada</label>
        <input
          type="datetime-local"
          value={form.fechaLlamada}
          onChange={(e) => setForm({ ...form, fechaLlamada: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Notas</label>
        <input
          value={form.notas}
          onChange={(e) => setForm({ ...form, notas: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-50"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
