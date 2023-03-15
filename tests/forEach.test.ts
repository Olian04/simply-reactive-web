import { describe, it } from 'mocha';
import { expect } from 'chai';
import { createAtom } from 'simply-reactive';

import { forEach } from '!api';
import { html } from './util/testRenderer';

describe('forEach', () => {
  it('should export a function', () => {
    expect(typeof forEach).to.equal('function');
  });

  it('should work', () => {
    const A = createAtom({
      default: ['A', 'B', 'C'],
    });
    const out = html`
      <ol>
        ${forEach(A, (v) => html`<li>${v}</li>`)}
      </ol>
    `;
    if (out.type !== 'Node') {
      expect.fail();
    }

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
