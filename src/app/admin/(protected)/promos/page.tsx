"use client";

import { useEffect, useState } from "react";
import ImageUploadField from "@/components/ImageUploadField";

type Promo = {
  id: string;
  slug: string;
  image: string;
  discountPercent: number;
  priceEur: number;
  rating: number;
  nameFr: string;
  nameEn: string;
  nameAr: string;
  locationFr: string;
  locationEn: string;
  locationAr: string;
  position: number;
};

const EMPTY: Omit<Promo, "id"> = {
  slug: "",
  image: "",
  discountPercent: 0,
  priceEur: 0,
  rating: 5,
  nameFr: "",
  nameEn: "",
  nameAr: "",
  locationFr: "",
  locationEn: "",
  locationAr: "",
  position: 0,
};

export default function AdminPromosPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [editing, setEditing] = useState<Promo | Omit<Promo, "id"> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/promos");
    if (res.ok) setPromos(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching the promo list from our own API on mount; no SSR-safe alternative for this client-only admin page
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setError(null);

    const isUpdate = "id" in editing;
    const res = await fetch(
      isUpdate ? `/api/admin/promos/${editing.id}` : "/api/admin/promos",
      {
        method: isUpdate ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      }
    );

    if (res.ok) {
      setEditing(null);
      await load();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Erreur lors de l'enregistrement");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette promo ?")) return;
    await fetch(`/api/admin/promos/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy-950">Promotions hôtels</h1>
        <button
          type="button"
          onClick={() => setEditing(EMPTY)}
          className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          + Ajouter une promo
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-navy-800/60">Chargement…</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {promos.map((promo) => (
            <div key={promo.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy-900/10">
              <p className="font-display text-base font-semibold text-navy-950">{promo.nameFr}</p>
              <p className="text-sm text-navy-800/60">
                {promo.locationFr} · -{promo.discountPercent}% · {promo.priceEur} € · ★ {promo.rating}
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(promo)}
                  className="text-sm font-semibold text-teal-600 hover:underline"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(promo.id)}
                  className="text-sm font-semibold text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/40 px-6">
          <form
            onSubmit={handleSave}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <p className="font-display text-lg font-semibold text-navy-950">
              {"id" in editing ? "Modifier la promo" : "Nouvelle promo"}
            </p>

            <div className="mt-4 grid gap-3">
              {!("id" in editing) && (
                <Field label="Identifiant (slug)" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
              )}
              <ImageUploadField label="Image" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />
              <div className="grid grid-cols-3 gap-3">
                <NumberField label="Remise (%)" value={editing.discountPercent} onChange={(v) => setEditing({ ...editing, discountPercent: v })} min={0} max={100} />
                <NumberField label="Prix (€)" value={editing.priceEur} onChange={(v) => setEditing({ ...editing, priceEur: v })} min={0} step={1} />
                <NumberField label="Note" value={editing.rating} onChange={(v) => setEditing({ ...editing, rating: v })} min={0} max={5} step={0.1} />
              </div>
              <Field label="Nom (FR)" value={editing.nameFr} onChange={(v) => setEditing({ ...editing, nameFr: v })} />
              <Field label="Nom (EN)" value={editing.nameEn} onChange={(v) => setEditing({ ...editing, nameEn: v })} />
              <Field label="Nom (AR)" value={editing.nameAr} onChange={(v) => setEditing({ ...editing, nameAr: v })} dir="rtl" />
              <Field label="Lieu (FR)" value={editing.locationFr} onChange={(v) => setEditing({ ...editing, locationFr: v })} />
              <Field label="Lieu (EN)" value={editing.locationEn} onChange={(v) => setEditing({ ...editing, locationEn: v })} />
              <Field label="Lieu (AR)" value={editing.locationAr} onChange={(v) => setEditing({ ...editing, locationAr: v })} dir="rtl" />
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-5 flex gap-3">
              <button type="submit" className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600">
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setError(null);
                }}
                className="rounded-xl bg-navy-100 px-4 py-2 text-sm font-semibold text-navy-800"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  dir?: "rtl" | "ltr";
}) {
  return (
    <label className="text-sm">
      <span className="font-medium text-navy-900">{label}</span>
      <input
        type="text"
        required
        dir={dir}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-teal-500"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="text-sm">
      <span className="font-medium text-navy-900">{label}</span>
      <input
        type="number"
        required
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-teal-500"
      />
    </label>
  );
}
