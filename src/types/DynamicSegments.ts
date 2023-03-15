import type { Trait } from 'simply-reactive';

type BaseTypes =  string | number;

export type DynamicSegments<RenderTarget> =
 | BaseTypes
 | RenderTarget[]
 | (Trait.ImplementsGet<BaseTypes> & Trait.ImplementsSubscribe)
 | ((ev: Event) => void);
