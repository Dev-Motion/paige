import type { StateCreator } from "..";

export interface LayoutSlice {
  sideBarPosition: "left" | "right";
  setSideBarPosition: (sideBar: "left" | "right") => void;
}
const createLayoutSlice: StateCreator<LayoutSlice> = (set) => ({
  sideBarPosition: "left",
  setSideBarPosition: (sideBar) => set({ sideBarPosition: sideBar }),
});
export default createLayoutSlice;
