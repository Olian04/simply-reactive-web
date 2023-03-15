import { ChildType, xml } from 'xml-template-literal';

import type { RendererConfig } from '!types/RendererConfig';
import type { DynamicSegments } from '!types/DynamicSegments';

import { RenderError } from '!errors/RenderError';
import { renderChild } from '!renderer/renderChild';
import { isWhitespaceNode } from '!util/isWhitespaceNode';

export const createRenderer =
  <RenderTarget>(config: RendererConfig<RenderTarget>) =>
  (
    staticSegments: TemplateStringsArray,
    ...dynamicSegments: DynamicSegments<RenderTarget>[]
  ): RenderTarget => {
    const ast = xml(staticSegments, ...dynamicSegments);

    const rootCandidates = ast.children.filter((ast) => !isWhitespaceNode(ast));

    if (rootCandidates.length !== 1) {
      throw new RenderError('HTML must have exactly 1 root element.');
    }

    const root = rootCandidates[0];

    if (root.type !== ChildType.Node) {
      throw new RenderError('Root element must be a valid XML node.');
    }

    return renderChild(config, root);
  };
