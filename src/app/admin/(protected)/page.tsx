import Link from "next/link";

const sections = [
  { href: "/admin/promos", title: "Promotions hôtels", desc: "Ajouter, modifier ou supprimer les promos affichées en page d'accueil." },
  { href: "/admin/offers", title: "Offres de vols", desc: "Ajouter, modifier ou supprimer les offres de billets d'avion." },
  { href: "/admin/theme", title: "Couleurs du site", desc: "Changer les couleurs principales (fond, boutons) de la page d'accueil." },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Tableau de bord</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy-900/10 transition-shadow hover:shadow-md"
          >
            <p className="font-display text-lg font-semibold text-navy-950">{s.title}</p>
            <p className="mt-1 text-sm text-navy-800/60">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
