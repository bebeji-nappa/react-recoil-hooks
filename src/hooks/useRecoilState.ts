import { useContext, useEffect, useState } from "react";
import { RecoilRootContext } from "../lib/RecoilRootContext";
import type { Atom } from "./useAtom";
import { Selector } from "./useSelector";

export const useRecoilState = <T>(atom: Atom<T> | Selector<T>): [T, (state: T) => void] => {
  const store = useContext(RecoilRootContext);

  const [state, setState] = useState(store.get(atom.key) as T);

  useEffect(() => {
    if (store.get(atom.key) === undefined) {
      throw new Error(`useRecoilState: key ${atom.key} not found in store`);
    }
  }, [store, atom.key]);

  const setRecoilState = (state: T) => {
    if (atom.type === "selector" && !atom?.setter) {
      throw new Error("useRecoilState: This state is read-only");
    }

    if (atom.setter) {
      atom.setter(state);
    }

    setState(store.get(atom.key) as T);
  };

  return [state, setRecoilState];
};
