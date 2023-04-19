import type { StateCreator } from "..";

interface Toast {
  id: string;
  type?: "success" | "error" | "info" | "warning";
  message: string;
  timeout?: number;
}
interface OptionalIdToast {
  id?: string;
  type?: "success" | "error" | "info" | "warning";
  message: string;
  timeout?: number;
}

const DEFAULT_WAIT = 3000;
let toastsCounter = 0;

export interface ToastSlice {
  activeToasts: Toast[];
  addToast: (toast: OptionalIdToast) => void;
  removeToast: (id: string) => void;
}
const createToastSlice: StateCreator<ToastSlice> = (set) => ({
  activeToasts: [],
  addToast(toast) {
    toast["id"] ??= `${toastsCounter++}`;
    set((state) => ({ activeToasts: [...state.activeToasts, toast as Toast] }));
    setTimeout(
      () =>
        set((state) => ({
          activeToasts: state.activeToasts.filter((t) => t.id !== toast.id),
        })),
      DEFAULT_WAIT
    );
  },
  removeToast(id) {
    set((state) => ({
      activeToasts: state.activeToasts.filter((toast) => toast.id !== id),
    }));
  },
});

export default createToastSlice;
