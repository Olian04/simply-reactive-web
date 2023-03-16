import { createRenderer } from '!renderer/createRenderer';

export { createQueryAtom } from '!composits/createQueryAtom';
export { createRenderer } from '!renderer/createRenderer';
export { forEach } from '!helpers/forEach';

export const html = createRenderer<Node>({
  createFragment: () => {
    const frag = document.createDocumentFragment();
    return {
      clearChildren: () => frag.replaceChildren(),
      appendChildren: (...els) => frag.append(...els),
      getRenderTarget: () => frag,
    };
  },
  createElement: (tag) => {
    const el = document.createElement(tag);
    return {
      appendChildren: (...els) => el.append(...els),
      setAttribute: (k, v) => el.setAttribute(k, v),
      addEventListener: (ev, cb) => el.addEventListener(ev, cb),
      removeEventListener: (ev, cb) => el.removeEventListener(ev, cb),
      setClassName: (className) => (el.className = className),
      getRenderTarget: () => el,
    };
  },
  createText: (textContent) => {
    const el = document.createTextNode(textContent);
    return {
      setText: (text) => (el.textContent = text),
      getRenderTarget: () => el,
    };
  },
});
