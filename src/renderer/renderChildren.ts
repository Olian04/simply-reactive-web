import { AstRoot, ChildType } from 'xml-template-literal';

import type { DynamicSegments } from '!types/DynamicSegments';
import type { RendererConfig } from '!types/RendererConfig';

import { renderChild } from '!renderer/renderChild';
import { isWhitespaceNode } from '!util/isWhitespaceNode';
import { stripWhitespaceFromNode } from '!util/stripWhitespaceFromNode';
import { isValidDataChild } from '!util/isValidDataChild';
import { RenderError } from '!errors/RenderError';
import { createEffect } from 'simply-reactive';

export const renderChildren = <RenderTarget>(
  config: RendererConfig<RenderTarget>,
  ast: Pick<AstRoot<DynamicSegments<RenderTarget>>, 'children'>
): RenderTarget[] =>
  ast.children
    .filter((ast) => !isWhitespaceNode(ast))
    .map((ast) => stripWhitespaceFromNode(ast))
    .flatMap((child) => {
      if (child.type === ChildType.Text) {
        return config.createText(child.value).getRenderTarget();
      }

      if (child.type === ChildType.Node) {
        return renderChild(config, child);
      }

      if (!isValidDataChild(child)) {
        throw new RenderError(
          `Invalid child data. Expected a number, string, or a an array of RenderTargets. But got "${child.value}"`
        );
      }

      if (typeof child.value === 'string') {
        return config.createText(child.value).getRenderTarget();
      }

      if (typeof child.value === 'number') {
        return config.createText(String(child.value)).getRenderTarget();
      }

      if (Array.isArray(child.value)) {
        return child.value;
      }

      const Value = child.value;
      const text = config.createText('');
      createEffect(() => {
        text.setText(String(Value.get()));
      });
      return text.getRenderTarget();
    });
