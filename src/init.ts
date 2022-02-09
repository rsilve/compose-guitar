import { actionInitApp } from "./actions/actions";
import { connect, initializeState } from "./stores/dispatcher";
import { saveLastState } from "./stores/register/gallery_tools";
import { default_state } from "./stores/state";
import { configureLocalization } from "@lit/localize";
import { sourceLocale, targetLocales } from "./generated/locales";

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale) => import(`./generated/locales/${locale}`),
});

export default function init(): void {
  initializeState(default_state());
  connect(saveLastState);
  actionInitApp().catch((reason) => console.info("initialization failed", reason));

  setLocale("fr");
}
