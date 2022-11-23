import React, { createContext, useReducer } from "react";

interface LayoutProps {
  sideBar: "left" | "right";
}
type LayoutContextType = [LayoutProps, React.Dispatch<Partial<LayoutProps>>];
const layoutContext = createContext<LayoutContextType | null>(null);

const reducer = (state: LayoutProps, newState: Partial<LayoutProps>) => {
  return { ...state, ...newState };
};
export default function LayoutProvider({
  children,
  ...layoutProps
}: {
  children: React.ReactNode;
} & LayoutProps) {
  const [layout, setLayout] = useReducer(reducer, layoutProps);
  return (
    <layoutContext.Provider value={[layout, setLayout]}>
      {children}
    </layoutContext.Provider>
  );
}

export const useLayout = () => {
  const context = React.useContext(layoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context!;
};
