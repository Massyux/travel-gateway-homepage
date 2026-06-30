import { useTranslations } from "next-intl";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo variant="light" iconSize={40} />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">{t("tagline")}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t("company")}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>{t("about")}</li>
              <li>{t("contact")}</li>
              <li>{t("careers")}</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t("resources")}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>{t("help")}</li>
              <li>{t("terms")}</li>
              <li>{t("privacy")}</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">{t("follow")}</p>
            <div className="mt-4 flex gap-3">
              {["Instagram", "Facebook", "LinkedIn"].map((social) => (
                <span
                  key={social}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-xs text-white/70"
                >
                  {social[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} Silvi Tour. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
