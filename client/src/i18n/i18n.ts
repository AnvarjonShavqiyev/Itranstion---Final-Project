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
        "collection-title": "Top 5 largest collections",
        "item-title": "Latest items",
        item: "item",
        like: "like",
        comment: "comment",
        items: "items",
        likes: "likes",
        comments: "comments",
        "search-results": "Search Results",
        "items-by-tag": "Items by #tag",
        "no-items": "No items",
        "no-comments": "No comments",
        "no-collections": "No collections",
        Items: "Items",
        Comments: "Comments",
        Collections: "Collections",
        Comment: "Comment",
        "at-this": "at this",
      },
    },
    uz: {
      translation: {
        "nav-login": "Kirish",
        "nav-language": "Til",
        "nav-search-ps": "Izlash...",
        "search-tags": "#taglar bilan izlang",
        "collection-title": "Top 5 katta to'plamlar",
        "item-title": "Oxirgi narsalar",
        item: "buyum",
        like: "yoqtirish",
        comment: "izoh",
        items: "buyumlar",
        likes: "yoqtirishlar",
        comments: "izohlar",
        "search-results": "Izlash natijalari",
        "items-by-tag": "#taglar bilan izlash natijalari",
        "no-items": "Buyumlar yo'q",
        "no-comments": "Izohlar yo'q",
        "no-collections": "To'plamlar yo'q",
        Items: "Buyumlar",
        Comments: "Izohlar",
        Collections: "To'plamlar",
        Comment: "Izoh",
        "at-this": "bu",
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
