import type { Trait } from 'simply-reactive';

type BaseTypes = string | number;

export type DynamicChild<RenderTarget> =
  | BaseTypes
  | RenderTarget[]
  | (Trait.ImplementsGet<BaseTypes> & Trait.ImplementsSubscribe);

export type DynamicAttribute =
  | BaseTypes
  | (Trait.ImplementsGet<BaseTypes> & Trait.ImplementsSubscribe)
  | ((ev: Event) => void);

export type DynamicSegments<RenderTarget> =
  | DynamicChild<RenderTarget>
  | DynamicAttribute;
