import Link from "next/link";
import { requireAdminSession } from "@/lib/auth";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <div className="min-h-screen">
      <header className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <nav className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-lg font-semibold text-navy-950">
              Silvi Tour — Admin
            </Link>
            <Link href="/admin/promos" className="text-sm font-medium text-navy-800/70 hover:text-navy-950">
              Promos
            </Link>
            <Link href="/admin/offers" className="text-sm font-medium text-navy-800/70 hover:text-navy-950">
              Vols
            </Link>
            <Link href="/admin/theme" className="text-sm font-medium text-navy-800/70 hover:text-navy-950">
              Couleurs
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <span className="text-sm text-navy-800/60">{session.username}</span>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}
