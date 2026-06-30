"use client";

import { useState } from "react";

export default function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);

    if (res.ok) {
      const data = await res.json();
      onChange(data.url);
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Échec de l'envoi de l'image");
    }
  }

  return (
    <div className="text-sm">
      <span className="font-medium text-navy-900">{label}</span>
      <div className="mt-1 flex items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element -- thumbnail preview of an admin-uploaded local file, not worth a next/image config entry for
          <img src={value} alt="" className="h-16 w-16 rounded-lg object-cover ring-1 ring-navy-900/10" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-navy-100 text-xs text-navy-800/50">
            Aucune
          </div>
        )}
        <label className="cursor-pointer rounded-xl border border-navy-900/15 px-3 py-2 text-sm font-medium text-navy-800 hover:bg-navy-100">
          {uploading ? "Envoi…" : value ? "Changer l'image" : "Choisir une image"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
