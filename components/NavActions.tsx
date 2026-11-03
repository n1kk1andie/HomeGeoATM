import { IconExternal } from "@/components/icons";

// The two actions in every GeoATM page header: the public ATM finder for
// everyone, and the operator portal's sign-in for institutions. Both stay
// visible on phones.
export const APP_URL = "https://geoatm.app";
export const SIGN_IN_URL = "https://admin.geoatm.app/operators";

export default function NavActions() {
  return (
    <div className="nav-actions">
      <a className="btn btn-red nav-cta" href={APP_URL} target="_blank" rel="noopener noreferrer">
        Open GeoATM <IconExternal />
      </a>
      <a className="btn btn-outline nav-cta" href={SIGN_IN_URL} target="_blank" rel="noopener noreferrer">
        Sign In
      </a>
    </div>
  );
}
