import { configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales, allLocales } from "../generated/locales";

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => {
    if (locale === "fr") {
      return import("../generated/locales/fr");
    }
    return Promise.reject(`unknown locale '${locale}'`);
  },
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
    console.warn(`Error loading locale for code '${lang}': ${(e as Error).message}`);
  }
  console.info("Language", getLocale());
}
