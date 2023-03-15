import { createRenderer } from '!renderer/createRenderer';

export { createRenderer } from '!renderer/createRenderer';
export { forEach } from '!helpers/forEach';

export const html = createRenderer<Node>({
  createElement: (tag) => {
    const el = document.createElement(tag);
    return {
      appendChildren: el.append,
      setAttribute: el.setAttribute,
      addEventListener: el.addEventListener,
      removeEventListener: el.removeEventListener,
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
