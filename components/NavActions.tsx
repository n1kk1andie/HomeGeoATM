import { getTranslations } from "next-intl/server";
import { IconExternal } from "@/components/icons";
import LanguagePicker from "@/components/LanguagePicker";

// The actions in every GeoATM page header: the language picker, the public ATM
// finder for everyone, and the operator portal's sign-in for institutions.
// All stay visible on phones.
export const APP_URL = "https://geoatm.app";
export const SIGN_IN_URL = "https://admin.geoatm.app/operators";

export default async function NavActions() {
  const t = await getTranslations("nav");
  return (
    <div className="nav-actions">
      <LanguagePicker compact className="nav-lang" label={t("language")} />
      <a className="btn btn-red nav-cta" href={APP_URL} target="_blank" rel="noopener noreferrer">
        {t("open")} <IconExternal />
      </a>
      <a className="btn btn-outline nav-cta" href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer">
        {t("signIn")}
      </a>
    </div>
  );
}
