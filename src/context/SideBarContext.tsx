import React from "react";

interface SideBarContext {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const context = React.createContext<SideBarContext | null>(null);

const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <context.Provider value={{ open, setOpen }}>{children}</context.Provider>
  );
};

export const useSideBar = () => {
  const contextValue = React.useContext(context);
  if (!contextValue) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }
  return contextValue;
};

export default SideBarProvider;
