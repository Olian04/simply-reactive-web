import { describe, it } from 'mocha';
import { expect } from 'chai';

import { createRenderer } from '!api';
import { RenderError } from '!errors/RenderError';
import { createAtom } from 'simply-reactive';

const wait = async (milliseconds: number = 0) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

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

const html = createRenderer<TestTarget>({
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

describe('api', () => {
  it('should export a template literal tag function', () => {
    expect(typeof html).to.equal('function');
    const out = html` <div></div> `;
    expect(typeof out).to.equal('object');
  });

  it('should throw when provided no root element', () => {
    expect(() => html``).to.throw(RenderError);
  });

  it('should throw when provided multiple root elements', () => {
    expect(
      () =>
        html`<h1></h1>
          <h2></h2>`
    ).to.throw(RenderError);
  });

  it('should throw when provided invalid root element type', () => {
    expect(() => html`hello`).to.throw(RenderError);
    expect(() => html`${42}`).to.throw(RenderError);
  });

  it('should throw when provided function value to composite attribute', () => {
    expect(() => html` <div foo="before ${() => 42} after"></div> `).to.throw(
      RenderError
    );
  });

  it('should throw when provided array value to composite attribute', () => {
    expect(() => html` <div foo="before ${[]} after"></div> `).to.throw(
      RenderError
    );
  });

  it('should throw when provided array value to data attribute', () => {
    expect(() => html` <div foo=${[]}></div> `).to.throw(RenderError);
  });

  it('should work with text attributes', () => {
    const out = html` <div foo="bar"></div> `;
    if ('innerText' in out) {
      expect.fail();
    }

    expect(out).to.deep.equal({
      tag: 'div',
      events: [],
      children: [],
      attributes: { foo: 'bar' },
    });
  });

  it('should work with child nodes', () => {
    const out = html`<h1>
      <h2></h2>
      <h3></h3>
    </h1>`;
    if ('innerText' in out) {
      expect.fail();
    }

    expect(out).to.deep.equal({
      tag: 'h1',
      events: [],
      children: [
        {
          tag: 'h2',
          events: [],
          children: [],
          attributes: {},
        },
        {
          tag: 'h3',
          events: [],
          children: [],
          attributes: {},
        },
      ],
      attributes: {},
    });
  });

  it('should work with child text node', () => {
    const out = html`<h1>Hello</h1>`;
    if ('innerText' in out) {
      expect.fail();
    }

    expect(out).to.deep.equal({
      tag: 'h1',
      events: [],
      children: [
        {
          innerText: 'Hello',
        },
      ],
      attributes: {},
    });
  });

  it('should work with child data node', async () => {
    const A = createAtom({
      default: 3,
    });
    const out = html`<h1>${A}</h1>`;
    if ('innerText' in out) {
      expect.fail();
    }

    expect(out).to.deep.equal({
      tag: 'div',
      events: [],
      children: [
        {
          innerText: '3',
        },
      ],
      attributes: {},
    });

    A.set(42);
    await wait();
    expect(out).to.deep.equal({
      tag: 'div',
      events: [],
      children: [
        {
          innerText: '42',
        },
      ],
      attributes: {},
    });
  });

  it('should work with data attributes', async () => {
    const A = createAtom({
      default: 3,
    });
    const out = html` <div foo=${A}></div> `;
    if ('innerText' in out) {
      expect.fail();
    }

    expect(out).to.deep.equal({
      tag: 'div',
      events: [],
      children: [],
      attributes: { foo: '3' },
    });

    A.set(42);
    await wait();
    expect(out).to.deep.equal({
      tag: 'div',
      events: [],
      children: [],
      attributes: { foo: '42' },
    });
  });

  it('should work with composite attributes', async () => {
    const A = createAtom({
      default: 3,
    });
    const out = html` <div foo="before ${A} after"></div> `;
    if ('innerText' in out) {
      expect.fail();
    }

    expect(out).to.deep.equal({
      tag: 'div',
      events: [],
      children: [],
      attributes: { foo: 'before 3 after' },
    });

    A.set(42);
    await wait();
    expect(out).to.deep.equal({
      tag: 'div',
      events: [],
      children: [],
      attributes: { foo: 'before 42 after' },
    });
  });

  it('should work with function attributes', () => {
    const func = () => 42;
    const out = html` <div foo=${func}></div> `;

    if ('innerText' in out) {
      expect.fail();
    }

    expect(out).to.deep.equal({
      tag: 'div',
      events: [['foo', func]],
      children: [],
      attributes: {},
    });

    expect(out.events[0][1]()).to.equal(42);
  });
});
