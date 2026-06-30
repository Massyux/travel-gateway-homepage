"use client";

import { useEffect, useState } from "react";

const DEFAULT_THEME = { navy600: "#28465d", teal500: "#1b9aae" };

export default function AdminThemePage() {
  const [navy600, setNavy600] = useState(DEFAULT_THEME.navy600);
  const [teal500, setTeal500] = useState(DEFAULT_THEME.teal500);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/theme")
      .then((res) => res.json())
      .then((theme) => {
        setNavy600(theme.navy600);
        setTeal500(theme.teal500);
        setLoading(false);
      });
  }, []);

  async function saveColors(colors: { navy600: string; teal500: string }) {
    setSaving(true);
    setSaved(false);
    setError(null);

    const res = await fetch("/api/admin/theme", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(colors),
    });

    setSaving(false);
    if (res.ok) {
      setSaved(true);
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Erreur lors de l'enregistrement");
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    saveColors({ navy600, teal500 });
  }

  function handleReset() {
    setNavy600(DEFAULT_THEME.navy600);
    setTeal500(DEFAULT_THEME.teal500);
    saveColors(DEFAULT_THEME);
  }

  if (loading) {
    return <p className="text-sm text-navy-800/60">Chargement…</p>;
  }

  return (
    <div className="max-w-md">
      <h1 className="font-display text-2xl font-semibold text-navy-950">Couleurs du site</h1>
      <p className="mt-1 text-sm text-navy-800/60">
        Ces deux couleurs pilotent le fond (bleu nuit) et les boutons/accents (sarcelle) de la
        page d&apos;accueil publique.
      </p>

      <form onSubmit={handleSave} className="mt-6 flex flex-col gap-5">
        <ColorField label="Couleur de fond principale" value={navy600} onChange={setNavy600} />
        <ColorField label="Couleur d'accent (boutons)" value={teal500} onChange={setTeal500} />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {saved && <p className="text-sm text-teal-600">Couleurs enregistrées.</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600 disabled:opacity-60"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="rounded-xl bg-navy-100 px-4 py-2 text-sm font-semibold text-navy-800 hover:bg-navy-100/70 disabled:opacity-60"
          >
            Réinitialiser les couleurs
          </button>
        </div>
      </form>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="text-sm">
      <span className="font-medium text-navy-900">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-14 cursor-pointer rounded-lg border border-navy-900/15"
        />
        <input
          type="text"
          pattern="^#[0-9a-fA-F]{6}$"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-32 rounded-xl border border-navy-900/15 px-3 py-2 text-sm outline-none focus:border-teal-500"
        />
      </div>
    </label>
  );
}
