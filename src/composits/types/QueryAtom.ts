import { Trait } from 'simply-reactive';

export type QueryAtom<T> = Trait.ImplementsKey &
  Trait.ImplementsGet<T> &
  Trait.ImplementsSet<T> &
  Trait.ImplementsSubscribe & {
    urlWhenSet: (valueOrFunction: T | ((old: T) => T)) => string;
  };
