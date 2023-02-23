import type { StateCreator } from "..";

export interface QuotesSlice {
  quote: Quote;
  getQuotes: () => void;
  quoteKeywords: string[];
  quoteAuthor: string;
  setQuoteKeywords: (keywords: string[]) => void;
  favouriteQuotes: Quote[];
  setFavouriteQuotes: (
    quotes: Quote[] | ((quotes: Quote[]) => Quote[])
  ) => void;
}

interface Quote {
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

const createQuotesSlice: StateCreator<QuotesSlice> = (set) => ({
  quote: {
    id: "default",
    text: "Think lightly of yourself and deeply of the world.",
    author: "Miyamoto Musashi",
  },
  getQuotes: () => {
    fetch("https://api.quotable.io/random?minLength=100&maxLength=100")
      .then((response) => response.json())
      .then((data: QuotableReturn) => {
        set((state) => ({
          quote: {
            id: data._id,
            text: data.content,
            author: data.author,
          },
        }));
      });
  },
  quoteKeywords: [],
  quoteAuthor: "",
  setQuoteKeywords: (keywords) => {
    set((state) => ({ quoteKeywords: keywords }));
  },
  favouriteQuotes: [],
  setFavouriteQuotes: (quotes) => {
    if (Array.isArray(quotes)) {
      set((state) => ({ favouriteQuotes: quotes }));
    }
    if (typeof quotes === "function") {
      set((state) => ({ favouriteQuotes: quotes(state.favouriteQuotes) }));
    }
  },
});

export default createQuotesSlice;
