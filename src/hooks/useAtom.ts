import { useContext, useEffect, useRef, useState } from 'react';
import { RecoilRootContext } from '../lib/RecoilRootContext';

export type Atom<T> = { type: string, key: string, default: T, setter: (newValue: T) => void };

export const useAtom = <T>(data: { key: string, default: T }): Atom<T> => {
  const store = useContext(RecoilRootContext);
  const valueRef = useRef(data.default);
  store.set(data.key, data.default);

  return {
    type: "atom",
    key: data.key,
    default: valueRef.current,
    setter: (newValue: T) => {
      store.set(data.key, newValue);
      valueRef.current = newValue;
    }
  };
};
