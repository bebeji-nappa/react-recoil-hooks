import { useRef, type RefObject } from "react";

export const useInitialRecoilStore = <T>(): RefObject<Map<string, T>> => {
  const store = useRef(new Map<string, T>());
  return store;
};
