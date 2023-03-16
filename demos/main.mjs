import { createSelector } from 'https://cdn.jsdelivr.net/npm/simply-reactive@5';
import {
  html,
  createQueryAtom,
} from 'https://cdn.jsdelivr.net/npm/simply-reactive-web';

const A = createQueryAtom({
  key: 'a',
  default: 2,
});

const B = createQueryAtom({
  key: 'b',
  default: 3,
});

const Prod = createSelector({
  get: () => A.get() * B.get(),
});

const Sum = createSelector({
  get: () => A.get() + B.get(),
});

document.body.append(html`
  <div>
    <label>
      A:
      <input
        type="number"
        keyup=${(ev) => A.set(parseFloat(ev.target.value))}
        change=${(ev) => A.set(parseFloat(ev.target.value))}
        value=${A.get()}
      />
    </label>
    <label>
      B:
      <input
        type="number"
        keyup=${(ev) => B.set(parseFloat(ev.target.value))}
        change=${(ev) => B.set(parseFloat(ev.target.value))}
        value=${B.get()}
      />
    </label>
    <p>${A} + ${B} ${' = '} ${Sum}</p>
    <p>${A} * ${B} ${' = '} ${Prod}</p>
  </div>
`);
