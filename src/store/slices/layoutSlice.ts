import type { StateCreator } from "..";

export interface LayoutSlice {
  sideBarPosition: "left" | "right";
  setSideBarPosition: (sideBar: "left" | "right") => void;
  setSideBarOpen: (open: boolean) => void;
  sideBarOpen: boolean;
  is24Hour: boolean;
  setIs24Hour: (is24Hour: boolean) => void;
}
const createLayoutSlice: StateCreator<LayoutSlice> = (set) => ({
  sideBarPosition: "left",
  setSideBarPosition(sideBar) {
    set({ sideBarPosition: sideBar });
  },

  sideBarOpen: false,
  setSideBarOpen(open) {
    set({ sideBarOpen: open });
  },
  is24Hour: false,
  setIs24Hour(is24Hour) {
    set({ is24Hour });
  },
});
export default createLayoutSlice;
