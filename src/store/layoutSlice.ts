import type { StateCreator } from ".";

export interface LayoutSlice {
  sideBar: "left" | "right";
  setSideBar: (sideBar: "left" | "right") => void;
}
const createLayoutSlice: StateCreator<LayoutSlice> = (set) => ({
  sideBar: "left",
  setSideBar: (sideBar) => set({ sideBar }),
});
export default createLayoutSlice;
