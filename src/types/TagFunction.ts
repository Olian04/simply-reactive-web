import type { DynamicSegments } from '!types/DynamicSegments';

export type TagFunction<RenderTarget> = (
  staticSegments: TemplateStringsArray,
  ...dynamicSegments: DynamicSegments<RenderTarget>[]
) => RenderTarget;
