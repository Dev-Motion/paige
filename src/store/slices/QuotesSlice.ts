import type { StateCreator } from "..";

export interface QuotesSlice {
  quote: Quote;
  customQuotes: Quote[];
  setCustomQuotes: (quotes: Quote[] | ((quotes: Quote[]) => Quote[])) => void;
  getQuotes: () => void;
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
interface QuotableReturn {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

const createQuotesSlice: StateCreator<QuotesSlice> = (set, get) => ({
  quote: {
    id: "default",
    text: "Think lightly of yourself and deeply of the world.",
    author: "Miyamoto Musashi",
  },
  customQuotes: [],
  setCustomQuotes: (quotes) => {
    if (Array.isArray(quotes)) {
      set({ customQuotes: quotes });
    }
    if (typeof quotes === "function") {
      set((state) => ({ customQuotes: quotes(state.customQuotes) }));
    }
  },
  getQuotes: () => {
    fetch(
      "https://api.quotable.io/random?minLength=40&maxLength=60&tags=" +
        get().quoteKeywords.join("|")
    )
      .then((response) => response.json())
      .then((json) => {
        const data = json as QuotableReturn;
        set({
          quote: {
            id: data._id,
            text: data.content,
            author: data.author,
          },
        });
        get().updateLastFetched("quote");
      });
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
