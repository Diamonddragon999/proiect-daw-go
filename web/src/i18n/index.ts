import en from "./en.json";
import ro from "./ro.json";

export type Language = "en" | "ro";
export type Dictionary = typeof en;

export const dictionaries: Record<Language, Dictionary> = { en, ro: ro as Dictionary };

export const isLanguage = (v: string | undefined): v is Language => v === "en" || v === "ro";
