import { AstRoot, ChildType } from 'xml-template-literal';

import type { DynamicSegments } from '!types/DynamicSegments';
import type { RendererConfig } from '!types/RendererConfig';

import { renderChild } from '!renderer/renderChild';
import { isWhitespaceNode } from '!util/isWhitespaceNode';
import { stripWhitespaceFromNode } from '!util/stripWhitespaceFromNode';
import { isValidDataChild } from '!util/isValidDataChild';
import { RenderError } from '!errors/RenderError';

export const renderChildren = <RenderTarget>(
  config: RendererConfig<RenderTarget>,
  ast: Pick<AstRoot<DynamicSegments<RenderTarget>>, 'children'>
) =>
  ast.children
    .filter((ast) => !isWhitespaceNode(ast))
    .map((ast) => stripWhitespaceFromNode(ast))
    .flatMap((child) => {
      if (child.type === ChildType.Text) {
        return config.createText(child.value);
      }

      if (child.type === ChildType.Node) {
        return [renderChild(config, child)];
      }

      if (!isValidDataChild(child)) {
        throw new RenderError(
          `Invalid child data. Expected a number, string, or a an array of RenderTargets. But got "${child.value}"`
        );
      }

      if (typeof child.value === 'string') {
        return config.createText(child.value);
      }

      if (typeof child.value === 'number') {
        return config.createText(String(child.value));
      }

      return child.value;
    });
