"use client";

import { useEffect, useState } from "react";
import ImageUploadField from "@/components/ImageUploadField";

type FlightOffer = {
  id: string;
  slug: string;
  image: string;
  priceEur: number;
  tagFr: string;
  tagEn: string;
  tagAr: string;
  fromFr: string;
  fromEn: string;
  fromAr: string;
  toFr: string;
  toEn: string;
  toAr: string;
  position: number;
};

const EMPTY: Omit<FlightOffer, "id"> = {
  slug: "",
  image: "",
  priceEur: 0,
  tagFr: "",
  tagEn: "",
  tagAr: "",
  fromFr: "",
  fromEn: "",
  fromAr: "",
  toFr: "",
  toEn: "",
  toAr: "",
  position: 0,
};

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [editing, setEditing] = useState<FlightOffer | Omit<FlightOffer, "id"> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/offers");
    if (res.ok) setOffers(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching the offer list from our own API on mount; no SSR-safe alternative for this client-only admin page
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setError(null);

    const isUpdate = "id" in editing;
    const res = await fetch(
      isUpdate ? `/api/admin/offers/${editing.id}` : "/api/admin/offers",
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
    if (!confirm("Supprimer cette offre ?")) return;
    await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy-950">Offres de vols</h1>
        <button
          type="button"
          onClick={() => setEditing(EMPTY)}
          className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600"
        >
          + Ajouter une offre
        </button>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-navy-800/60">Chargement…</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {offers.map((offer) => (
            <div key={offer.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy-900/10">
              <p className="font-display text-base font-semibold text-navy-950">
                {offer.fromFr} → {offer.toFr}
              </p>
              <p className="text-sm text-navy-800/60">
                {offer.tagFr} · à partir de {offer.priceEur} €
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(offer)}
                  className="text-sm font-semibold text-teal-600 hover:underline"
                >
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(offer.id)}
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
              {"id" in editing ? "Modifier l'offre" : "Nouvelle offre"}
            </p>

            <div className="mt-4 grid gap-3">
              {!("id" in editing) && (
                <Field label="Identifiant (slug)" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v })} />
              )}
              <ImageUploadField label="Image" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />
              <NumberField label="Prix (€)" value={editing.priceEur} onChange={(v) => setEditing({ ...editing, priceEur: v })} />
              <Field label="Tag (FR)" value={editing.tagFr} onChange={(v) => setEditing({ ...editing, tagFr: v })} />
              <Field label="Tag (EN)" value={editing.tagEn} onChange={(v) => setEditing({ ...editing, tagEn: v })} />
              <Field label="Tag (AR)" value={editing.tagAr} onChange={(v) => setEditing({ ...editing, tagAr: v })} dir="rtl" />
              <Field label="Départ (FR)" value={editing.fromFr} onChange={(v) => setEditing({ ...editing, fromFr: v })} />
              <Field label="Départ (EN)" value={editing.fromEn} onChange={(v) => setEditing({ ...editing, fromEn: v })} />
              <Field label="Départ (AR)" value={editing.fromAr} onChange={(v) => setEditing({ ...editing, fromAr: v })} dir="rtl" />
              <Field label="Arrivée (FR)" value={editing.toFr} onChange={(v) => setEditing({ ...editing, toFr: v })} />
              <Field label="Arrivée (EN)" value={editing.toEn} onChange={(v) => setEditing({ ...editing, toEn: v })} />
              <Field label="Arrivée (AR)" value={editing.toAr} onChange={(v) => setEditing({ ...editing, toAr: v })} dir="rtl" />
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
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="text-sm">
      <span className="font-medium text-navy-900">{label}</span>
      <input
        type="number"
        required
        min={0}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-xl border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-teal-500"
      />
    </label>
  );
}
