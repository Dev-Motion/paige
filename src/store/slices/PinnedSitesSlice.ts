import type { StateCreator } from "..";

export interface PinnedSitesSlice {
  pinnedSites: PinnedSite[];
  addPinnedSite: (site: Omit<PinnedSite, "id">) => void;
  editPinnedSite: (id: string, site: Omit<PinnedSite, "id">) => void;
}

interface PinnedSite {
  id: string;
  url: string;
  title: string;
}
const createPinnedSitesSlice: StateCreator<PinnedSitesSlice> = (set, get) => ({
  pinnedSites: [],
  addPinnedSite(site) {
    set((state) => ({
      pinnedSites: [...state.pinnedSites, { id: crypto.randomUUID(), ...site }],
    }));
    return;
  },
  editPinnedSite(id, site) {
    set((state) => ({
      pinnedSites: state.pinnedSites.map((s) =>
        s.id === id ? { ...s, ...site } : s
      ),
    }));
  },
});

export default createPinnedSitesSlice;
