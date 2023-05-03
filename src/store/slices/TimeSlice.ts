import type { StateCreator } from "..";

export interface TimeSlice {
  time: number;
  setTime: () => void;
}

const createToastSlice: StateCreator<TimeSlice> = (set) => ({
  time: Date.now(),
  setTime: () => set({ time: Date.now() }),
});

export default createToastSlice;
