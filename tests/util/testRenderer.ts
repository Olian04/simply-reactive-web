import { createRenderer } from '!api';

type TestTarget =
  | {
      type: 'Node';
      tag: string;
      events: [string, Function][];
      children: TestTarget[];
      attributes: Record<string, string>;
    }
  | {
      type: 'Fragment';
      children: TestTarget[];
    }
  | {
      type: 'Text';
      innerText: string | null;
    };

export const html = createRenderer<TestTarget>({
  createFragment: () => {
    const ctx: TestTarget = {
      type: 'Fragment',
      children: [],
    };
    return {
      appendChildren: (...evs) => ctx.children.push(...evs),
      clearChildren: () => (ctx.children = []),
      getRenderTarget: () => ctx,
    };
  },
  createElement: (tag) => {
    const ctx: TestTarget = {
      type: 'Node',
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
    const ctx: TestTarget = {
      type: 'Text',
      innerText: str,
    };

    return {
      setText: (newStr) => (ctx.innerText = newStr),
      getRenderTarget: () => ctx,
    };
  },
});
