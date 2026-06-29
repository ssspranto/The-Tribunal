import { EN } from "./en";
import { BN } from "./bn";

export { EN } from "./en";
export { BN } from "./bn";
export { LANGUAGES, DEFAULT_LANGUAGE } from "./languages";

export const getTranslation = (language) => {
  switch (language) {
    case "bn": return BN;
    case "en":
    default: return EN;
  }
};
