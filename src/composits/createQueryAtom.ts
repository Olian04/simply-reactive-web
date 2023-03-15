import { createAtom, createGroup } from 'simply-reactive';

import type { QueryAtom } from './types/QueryAtom';

const ValueGroup = createGroup({
  key: `[INTERNAL]_query_atoms`,
  getDefault: (id: string) =>
    createAtom({
      key: id,
      default: '' as string | number,
    }),
});

export const createQueryAtom = <T = string | number>(props: {
  key: string;
  default: T;
}): QueryAtom<T> => {
  const key = props.key;
  const Value = ValueGroup.find(key);

  const currentQueryValue = new URLSearchParams(location.search).get(key);
  if (currentQueryValue && typeof props.default === 'number') {
    Value.set(parseFloat(currentQueryValue));
  } else if (currentQueryValue && typeof props.default === 'string') {
    Value.set(currentQueryValue);
  } else {
    Value.set(props.default as any);
  }

  const toUrlString = (value: T) => {
    const query = new URLSearchParams(location.search);
    if (props.default === value) {
      query.delete(key);
    } else {
      query.set(key, String(value));
    }
    const queryString = query.toString();
    return `${location.origin}${location.pathname}${
      queryString.length > 0 ? `?${queryString}` : ''
    }`;
  };

  const api = {
    key,
    get: () => Value.get() as T,
    subscribe: Value.subscribe,
    set: (valueOrFunction: T | ((oldValue: T) => T)) => {
      Value.set(valueOrFunction as any);
      history.pushState(null, '', toUrlString(Value.get() as any));
    },
    urlWhenSet: (valueOrFunction: T | ((oldValue: T) => T)) => {
      ValueGroup.get().forEach((v) => v.get()); // Subscribe to all query atoms
      if (typeof valueOrFunction === 'function') {
        const func = valueOrFunction as (oldValue: T) => T;
        return toUrlString(func(Value.get() as any));
      }
      return toUrlString(valueOrFunction);
    },
  };

  return api;
};
