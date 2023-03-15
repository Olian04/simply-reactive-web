import { Trait, createSelector } from 'simply-reactive';

type Gettable<T> = Trait.ImplementsGet<T> & Trait.ImplementsSubscribe;

export const forEach = <T, RenderTarget>(
  items: Gettable<(Gettable<T> | T)[]>,
  callback: (item: T, index: number) => RenderTarget
): Gettable<RenderTarget[]> =>
  createSelector({
    get: () =>
      items
        .get()
        .map((v, i) =>
          callback(
            typeof v === 'object' && v !== null && 'get' in v ? v.get() : v,
            i
          )
        ),
  });
