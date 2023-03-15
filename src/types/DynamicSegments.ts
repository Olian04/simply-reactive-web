import type { Trait } from 'simply-reactive';

type BaseTypes = string | number;

export type DynamicChild<RenderTarget> =
  | BaseTypes
  | RenderTarget[]
  | (Trait.ImplementsGet<BaseTypes | RenderTarget[]> &
      Trait.ImplementsSubscribe);

export type DynamicAttribute =
  | BaseTypes
  | ((ev: Event) => void)
  | (Trait.ImplementsGet<BaseTypes | ((ev: Event) => void)> &
      Trait.ImplementsSubscribe);

export type DynamicSegments<RenderTarget> =
  | DynamicChild<RenderTarget>
  | DynamicAttribute;
