import { createRenderer } from '!api';

type TestTarget =
  | {
      tag: string;
      events: [string, Function][];
      children: TestTarget[];
      attributes: Record<string, string>;
    }
  | {
      innerText: string | null;
    };
export const html = createRenderer<TestTarget>({
  createElement: (tag) => {
    const ctx: TestTarget = {
      tag,
      events: [],
      children: [],
      attributes: {},
    };
    return {
      addEventListener: (ev, cb) => ctx.events.push([ev, cb]),
      removeEventListener: (ev, cb) =>
        (ctx.events = ctx.events.filter(([e, c]) => e !== ev && c !== cb)),
      appendChildren: (...evs) => ctx.children.push(...evs),
      setAttribute: (k, v) => (ctx.attributes[k] = v),
      setClassName: (v) => (ctx.attributes.class = v),
      getRenderTarget: () => ctx,
    };
  },
  createText: (str) => {
    const ctx = {
      innerText: str,
    };

    return {
      setText: (newStr) => (ctx.innerText = newStr),
      getRenderTarget: () => ctx,
    };
  },
});
