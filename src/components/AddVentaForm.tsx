"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Option = { id: string; nombre: string };

export default function AddVentaForm({
  clientes,
  productos,
}: {
  clientes: Option[];
  productos: Option[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    clienteId: "",
    productoId: "",
    cantidad: "1",
    estado: "PAGADA",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ clienteId: "", productoId: "", cantidad: "1", estado: "PAGADA" });
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
        + Nueva venta
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Cliente</label>
        <select
          required
          value={form.clienteId}
          onChange={(e) => setForm({ ...form, clienteId: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        >
          <option value="">Selecciona...</option>
          {clientes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Producto</label>
        <select
          required
          value={form.productoId}
          onChange={(e) => setForm({ ...form, productoId: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        >
          <option value="">Selecciona...</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Cantidad</label>
        <input
          type="number"
          min={1}
          value={form.cantidad}
          onChange={(e) => setForm({ ...form, cantidad: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm w-20"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">Estado</label>
        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value })}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        >
          <option value="PAGADA">Pagada</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="CANCELADA">Cancelada</option>
        </select>
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
