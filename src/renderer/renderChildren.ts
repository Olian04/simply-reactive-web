import { AstRoot, ChildType } from "xml-template-literal";

import type { DynamicSegments } from "!types/DynamicSegments";
import type { RendererConfig } from "!types/RendererConfig";

import { renderChild } from "!renderer/renderChild";
import { isWhitespaceNode } from "!util/isWhitespaceNode";
import { stripWhitespaceFromNode } from "!util/stripWhitespaceFromNode";

export const renderChildren = <RenderTarget>(config: RendererConfig<RenderTarget>, ast: Pick<AstRoot<DynamicSegments<RenderTarget>>, 'children'>) =>
  ast.children
    .filter(ast => !isWhitespaceNode(ast))
    .map(ast => stripWhitespaceFromNode(ast))
    .flatMap(ast => {
      if (ast.type === ChildType.Text) {
        return config.createText(ast.value);
      } else if (ast.type === ChildType.Data) {
        if (typeof ast.value === 'string') {
          return config.createText(ast.value);
        } else if (typeof ast.value === 'number') {
          return config.createText(String(ast.value));
        } else if (Array.isArray(ast.value)) {
          return ast.value;
        }
        throw new Error(`Unexpected child: ${ast}`);
      }
      return [
        renderChild(config, ast),
      ];
    });
