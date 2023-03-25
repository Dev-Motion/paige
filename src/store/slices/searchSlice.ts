import { SearchProviders } from "@constants";
import type { StateCreator } from "..";

export interface SearchSlice {
  history: string[];
  setHistory: (history: string[]) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchProvider: SearchProviders;
  setSearchProvider: (provider: SearchProviders) => void;
}

const createSearchSlice: StateCreator<SearchSlice> = (set) => ({
  history: [],
  setHistory(history) {
    set({ history });
  },
  searchOpen: false,
  setSearchOpen(open) {
    set({ searchOpen: open });
  },
  searchProvider: "Google",
  setSearchProvider(provider) {
    set({ searchProvider: provider });
  },
});

export default createSearchSlice;
