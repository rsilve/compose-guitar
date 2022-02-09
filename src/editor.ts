import "./ui/editor-main";

import init from "./init";
import register_callbacks from "./stores/register_callbacks";
import { html, render } from "lit";
import { configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales, allLocales } from "./generated/locales";

function run(): void {
  register_callbacks();
  init();
}

const main = document.querySelector("main")!;
const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`./generated/locales/${locale}.ts`),
});

(async () => {
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
  render(html` <editor-main></editor-main> `, main);
  run();
})();
