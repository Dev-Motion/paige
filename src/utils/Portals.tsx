import { createPortal } from "react-dom";
import React, { ReactNode, useEffect, useState } from "react";
import { Box } from "@components/base";
type AvailableRoots = "side_bar_root" | "modal_root";

const Portal = ({
  children,
  root,
}: {
  children: ReactNode;
  root: AvailableRoots;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);
  if (mounted) {
    return (
      <>{createPortal(children, document.getElementById(root) as Element)}</>
    );
  }
  return null;
};
export default Portal;
