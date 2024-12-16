import { useContext } from "react";
import { RecoilRootContext } from "../lib/RecoilRootContext";

export const useRecoilValue = <T>(atom: { key: string; default: T }): T => {
  const store = useContext(RecoilRootContext);
  return store.get(atom.key) as T;
};
