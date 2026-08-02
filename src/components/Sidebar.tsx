"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Receipt,
  PhoneCall,
} from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Panel", icon: LayoutDashboard },
  { href: "/llamadas", label: "Llamadas", icon: PhoneCall },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/ventas", label: "Ventas", icon: ShoppingCart },
  { href: "/productos", label: "Productos", icon: Package },
  { href: "/gastos", label: "Gastos", icon: Receipt },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col bg-zinc-900 border-r border-zinc-800">
      <div className="px-6 py-5 border-b border-zinc-800">
        <p className="text-lg font-semibold text-white tracking-wide">MKGV</p>
        <p className="text-sm text-zinc-400">Panel de gestion</p>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-zinc-700 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 border-t border-zinc-800 text-xs text-zinc-500">
        Base del proyecto - listo para ampliar
      </div>
    </aside>
  );
}