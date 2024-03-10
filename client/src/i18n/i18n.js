import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "nav-login": "Login",
        "nav-language": "Language",
        "nav-search-ps": "Search...",
        "search-tags": "Search with #tags",
        "collection-title": "Top 5 collections",
      },
    },
    ru: {
      translation: {
        "nav-login": "Авторизоваться",
        "nav-language": "Язык",
        "nav-search-ps": "Поиск...",
        "search-tags": "Поиск по #тегам",
        "collection-title": "Топ 5 коллекций",
      },
    },
    uz: {
      translation: {
        "nav-login": "Kirish",
        "nav-language": "Til",
        "nav-search-ps": "Izlash...",
        "search-tags": "#taglar bilan izlang",
        "collection-title": "Top 5 to'plamlar",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
