export type RendererConfig<RenderTarget> = {
  createElement: (tag: string) => {
    appendChildren: (...el: RenderTarget[]) => void;
    setClassName: (className: string) => void;
    setAttribute: (key: string, value: string) => void;
    addEventListener: (
      eventName: string,
      callback: (ev: Event) => void
    ) => void;
    removeEventListener: (
      eventName: string,
      callback: (ev: Event) => void
    ) => void;
    getRenderTarget: () => RenderTarget;
  };
  createText: (textContent: string) => {
    setText: (textContent: string) => void;
    getRenderTarget: () => RenderTarget;
  };
};
