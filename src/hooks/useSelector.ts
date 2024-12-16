import { useContext, useEffect, useRef, useState } from "react";
import { RecoilRootContext } from "../lib/RecoilRootContext";

export type GetRecoilValue = <T>(atom: { key: string; default: T }) => T;
export type SetRecoilValue = <T>(newValue: T) => void;
export type Getter<T> = (param: { get: GetRecoilValue }) => T;
export type Setter<T> = (param: { get: GetRecoilValue; set: SetRecoilValue }, newValue: T) => void;
type Param<T> = { key: string; get: Getter<T>; set?: Setter<T> };
export type Selector<T> = { type: string; key: string; default: T; setter?: (newValue: T) => void };

export const useSelector = <T>(data: Param<T>): Selector<T> => {
  const store = useContext(RecoilRootContext);
  const valueRef = useRef<T>(
    data.get({ get: <T>(atom: { key: string; default: T }) => store.get(atom.key) as T }),
  );
  store.set(data.key, valueRef.current as T);

  return {
    type: "selector",
    key: data.key,
    default: valueRef.current,
    setter: (value: T) => {
      if (data.set) {
        data.set(
          {
            get: <T>(atom: { key: string; default: T }) => store.get(atom.key) as T,
            set: <T>(newValue: T) => {
              store.set(data.key, newValue);
            },
          },
          value,
        );
      }
    },
  };
};
