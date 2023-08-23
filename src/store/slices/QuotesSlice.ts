import type { StateCreator } from "..";

export interface QuotesSlice {
  customQuotes: Quote[];
  setCustomQuotes: (quotes: Quote[] | ((quotes: Quote[]) => Quote[])) => void;
  quoteKeywords: string[];
  quoteAuthor: string;
  setQuoteKeywords: (keywords: string[]) => void;
  favouriteQuotes: Quote[];
  setFavouriteQuotes: (
    quotes: Quote[] | ((quotes: Quote[]) => Quote[])
  ) => void;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
}
const createQuotesSlice: StateCreator<QuotesSlice> = (set, get) => ({
  customQuotes: [],
  setCustomQuotes: (quotes) => {
    if (Array.isArray(quotes)) {
      set({ customQuotes: quotes });
    }
    if (typeof quotes === "function") {
      set((state) => ({ customQuotes: quotes(state.customQuotes) }));
    }
  },
  quoteKeywords: ["inspirational", "motivational"],
  quoteAuthor: "",
  setQuoteKeywords: (keywords) => {
    set({ quoteKeywords: keywords });
  },
  favouriteQuotes: [],
  setFavouriteQuotes: (quotes) => {
    if (Array.isArray(quotes)) {
      set({ favouriteQuotes: quotes });
    }
    if (typeof quotes === "function") {
      set((state) => ({ favouriteQuotes: quotes(state.favouriteQuotes) }));
    }
  },
});

export default createQuotesSlice;
