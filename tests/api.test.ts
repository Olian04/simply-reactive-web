import { describe, it } from 'mocha';
import { expect } from 'chai';

import { createRenderer } from '!api';

type TestTarget =
  | {
      tag: string,
      events: [string, Function][],
      children: TestTarget[],
      attributes: Record<string, string>,
    }
  | {
      innerText: string | null,
    };

const html = createRenderer<TestTarget>({
  createElement: (tag) => {
    const ctx: TestTarget = {
      tag,
      events: [],
      children: [],
      attributes: {},
    };
    return {
      
      addEventListener: (ev, cb) =>  ctx.events.push([ev, cb]),
      removeEventListener: (ev, cb) => ctx.events = ctx.events.filter(([e,c]) => e !== ev && c !== cb),
      appendChildren: (...evs) => ctx.children.push(...evs),
      setAttribute: (k, v) => ctx.attributes[k] = v,
      setClassName: (v) => ctx.attributes.class = v,
      getRenderTarget: () => ctx,
    }
  },
  createText: str => ({
    innerText: str,
  }),
});

describe('api', () => {
  it('should export a template literal tag function', () => {
    expect(typeof html).to.equal('function');

    const out = html`
      <div></div>
    `;
  });

  it('should work with text attributes', () => {
    const out = html`
      <div foo="bar"></div>
    `;

    expect(out).to.deep.equal({
      tag: 'div',
      events: [],
      children: [],
      attributes: { foo: 'bar' },
    })
  });
});
