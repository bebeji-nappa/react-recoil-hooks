import React, { createContext, ReactElement, useRef } from "react";
import { useInitialRecoilStore } from "../../hooks/useInitialRecoilStore";
import { RecoilRootContext } from "../../lib/RecoilRootContext";

interface RecoilRootProps {
  children: ReactElement[];
}

export const RecoilRoot: React.FC<RecoilRootProps> = ({ children }) => {
  const init = new Map<string, unknown>();
  return <RecoilRootContext.Provider value={init}>{children}</RecoilRootContext.Provider>;
};
