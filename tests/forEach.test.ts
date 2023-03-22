import { describe, it } from 'mocha';
import { expect } from 'chai';
import { createAtom } from 'simply-reactive';

import { forEach } from '!api';
import { html } from './util/testRenderer';
import { wait } from './util/wait';

describe('forEach', () => {
  it('should export a function', () => {
    expect(typeof forEach).to.equal('function');
  });

  it('should render initial values', () => {
    const A = createAtom({
      default: ['A', 'B', 'C'],
    });
    const out = html`
      <ol>
        ${forEach(A, (v) => html`<li>${v}</li>`)}
      </ol>
    `;

    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'ol',
      events: [],
      children: [
        {
          type: 'Fragment',
          children: [
            {
              type: 'Node',
              tag: 'li',
              events: [],
              children: [
                {
                  type: 'Text',
                  innerText: A.get()[0],
                },
              ],
              attributes: {},
            },
            {
              type: 'Node',
              tag: 'li',
              events: [],
              children: [
                {
                  type: 'Text',
                  innerText: A.get()[1],
                },
              ],
              attributes: {},
            },
            {
              type: 'Node',
              tag: 'li',
              events: [],
              children: [
                {
                  type: 'Text',
                  innerText: A.get()[2],
                },
              ],
              attributes: {},
            },
          ],
        },
      ],
      attributes: {},
    });
  });

  it('should render updated values', async () => {
    const A = createAtom({
      default: [] as string[],
    });
    const out = html`
      <ol>
        ${forEach(A, (v) => html`<li>${v}</li>`)}
      </ol>
    `;

    A.set(['A', 'B', 'C']);
    await wait();
    expect(out).to.deep.equal({
      type: 'Node',
      tag: 'ol',
      events: [],
      children: [
        {
          type: 'Fragment',
          children: [
            {
              type: 'Node',
              tag: 'li',
              events: [],
              children: [
                {
                  type: 'Text',
                  innerText: A.get()[0],
                },
              ],
              attributes: {},
            },
            {
              type: 'Node',
              tag: 'li',
              events: [],
              children: [
                {
                  type: 'Text',
                  innerText: A.get()[1],
                },
              ],
              attributes: {},
            },
            {
              type: 'Node',
              tag: 'li',
              events: [],
              children: [
                {
                  type: 'Text',
                  innerText: A.get()[2],
                },
              ],
              attributes: {},
            },
          ],
        },
      ],
      attributes: {},
    });
  });
});
