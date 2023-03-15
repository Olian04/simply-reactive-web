import { Trait, createSelector } from 'simply-reactive';

type Gettable<T> = Trait.ImplementsGet<T> & Trait.ImplementsSubscribe;

export const forEach = <T, RenderTarget>(
  items: Gettable<T[]>,
  callback: (item: T, index: number) => RenderTarget
): Gettable<RenderTarget[]> =>
  createSelector({
    get: () => items.get().map((v, i) => callback(v, i)),
  });
