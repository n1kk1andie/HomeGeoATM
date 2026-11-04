"use client";

import { useLocale } from "next-intl";
import { LanguageSelect } from "@/lib/language/react";

// The shared Tumblehill language picker, for this app. `compact` for the top bar.
export default function LanguagePicker({ compact, className, label = "Language" }: { compact?: boolean; className?: string; label?: string }) {
  return <LanguageSelect current={useLocale()} compact={compact} label={label} className={className} />;
}
