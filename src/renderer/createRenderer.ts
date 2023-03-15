import { xml } from 'xml-template-literal';

import type { RendererConfig } from '!types/RendererConfig';
import type { DynamicSegments } from '!types/DynamicSegments';

export const createRenderer = <RenderTarget>(config: RendererConfig<RenderTarget>) =>
  (staticSegments: TemplateStringsArray, ...dynamicSegments: DynamicSegments<RenderTarget>[]): RenderTarget => {
    const ast = xml(staticSegments, ...dynamicSegments);

   return config.createElement('div').getRenderTarget();
  }
