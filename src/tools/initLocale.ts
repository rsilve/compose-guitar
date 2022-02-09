import { configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales, allLocales } from "../generated/locales";

const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`../generated/locales/${locale}.ts`),
});

export default async function localize(): Promise<void> {
  type LocalesNameType = typeof allLocales[number];
  let lang = window.navigator.language;
  if (!allLocales.includes(lang as LocalesNameType)) {
    lang = lang.split("-")[0];
  }
  try {
    await setLocale(lang);
  } catch (e) {
    // Either the URL locale code was invalid, or there was a problem loading
    // the locale module.
    console.warn(`Error loading locale for code '${lang}': ${(e as Error).message}`);
  }
  console.info("Language", getLocale());
}
