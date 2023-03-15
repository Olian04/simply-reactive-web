import { describe, it } from 'mocha';
import { expect } from 'chai';
import { createAtom } from 'simply-reactive';

import { RenderError } from '!errors/RenderError';
import { wait } from './util/wait';
import { html } from './util/testRenderer';

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
    if (out.type !== 'Node') {
      expect.fail();
    }

    expect(out).to.deep.equal({
      type: 'Node',
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
    if (out.type !== 'Node') {
      expect.fail();
    }

    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'h1',
      events: [],
      children: [
        {
          type: 'Node',
          tag: 'h2',
          events: [],
          children: [],
          attributes: {},
        },
        {
          type: 'Node',
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
    if (out.type !== 'Node') {
      expect.fail();
    }

    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'h1',
      events: [],
      children: [
        {
          type: 'Text',
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
    if (out.type !== 'Node') {
      expect.fail();
    }

    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'h1',
      events: [],
      children: [
        {
          type: 'Text',
          innerText: '3',
        },
      ],
      attributes: {},
    });

    A.set(42);
    await wait();
    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'h1',
      events: [],
      children: [
        {
          type: 'Text',
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
    if (out.type !== 'Node') {
      expect.fail();
    }

    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'div',
      events: [],
      children: [],
      attributes: { foo: '3' },
    });

    A.set(42);
    await wait();
    expect(out).to.deep.equal({
      type: 'Node',
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
    if (out.type !== 'Node') {
      expect.fail();
    }

    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'div',
      events: [],
      children: [],
      attributes: { foo: 'before 3 after' },
    });

    A.set(42);
    await wait();
    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'div',
      events: [],
      children: [],
      attributes: { foo: 'before 42 after' },
    });
  });

  it('should work with function attributes', () => {
    const func = () => 42;
    const out = html` <div foo=${func}></div> `;

    if (out.type !== 'Node') {
      expect.fail();
    }

    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'div',
      events: [['foo', func]],
      children: [],
      attributes: {},
    });

    expect(out.events[0][1]()).to.equal(42);
  });
});
