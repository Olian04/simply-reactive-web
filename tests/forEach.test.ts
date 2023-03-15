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

    expect(out).to.deep.equal({
      tag: 'ol',
      events: [],
      children: [
        {
          tag: 'li',
          events: [],
          children: [
            {
              innerText: A.get()[0],
            },
          ],
          attributes: {},
        },
        {
          tag: 'li',
          events: [],
          children: [
            {
              innerText: A.get()[1],
            },
          ],
          attributes: {},
        },
        {
          tag: 'li',
          events: [],
          children: [
            {
              innerText: A.get()[2],
            },
          ],
          attributes: {},
        },
      ],
      attributes: {},
    });
  });
});
