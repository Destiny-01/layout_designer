"use client";
import { createContext, useContext, ReactNode, useRef } from "react";

interface RootLayoutContextType {
  gridRef: React.MutableRefObject<HTMLDivElement | null>;
  tilePreviewDataUrl: React.MutableRefObject<string>;
}

const RootLayoutContext = createContext<RootLayoutContextType | undefined>(undefined);

export default function RootLayoutProvider({ children }: { children: ReactNode }) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const tilePreviewDataUrl = useRef('');

  return <RootLayoutContext.Provider value={{ gridRef, tilePreviewDataUrl }}>{children}</RootLayoutContext.Provider>;
}

export const useRootLayoutContext = () => {
  const context = useContext(RootLayoutContext);
  if (!context) {
    throw new Error("useRootLayoutContext must be used within a RootLayoutProvider");
  }
  return context;
};
