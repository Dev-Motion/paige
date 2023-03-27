import type { StateCreator } from "..";

export interface LayoutSlice {
  sideBarPosition: "left" | "right";
  setSideBarPosition: (sideBar: "left" | "right") => void;
  setSideBarOpen: (open: boolean) => void;
  sideBarOpen: boolean;
  is24Hour: boolean;
  setIs24Hour: (is24Hour: boolean) => void;
  showTime: boolean;
  setShowTime: (showTime: boolean) => void;
  showGreeting: boolean;
  setShowGreeting: (showGreeting: boolean) => void;
  showTodayGoal: boolean;
  setShowTodayGoal: (showTodayGoal: boolean) => void;
  showTodo: boolean;
  setShowTodo: (showTodo: boolean) => void;
  showDailyMotivation: boolean;
  setShowDailyMotivation: (showDailyMotivation: boolean) => void;
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
  showTime: true,
  setShowTime(showTime) {
    set({ showTime });
  },
  showGreeting: true,
  setShowGreeting(showGreeting) {
    set({ showGreeting });
  },
  showTodayGoal: true,
  setShowTodayGoal(showTodayGoal) {
    set({ showTodayGoal });
  },

  showTodo: true,
  setShowTodo(showTodo) {
    set({ showTodo });
  },
  showDailyMotivation: true,
  setShowDailyMotivation(showDailyMotivation) {
    set({ showDailyMotivation });
  },
});
export default createLayoutSlice;
