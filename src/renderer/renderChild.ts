import { AstChild, AttributeType, ChildType } from 'xml-template-literal';
import { createEffect } from 'simply-reactive';

import type { DynamicSegments } from '!types/DynamicSegments';
import type { RendererConfig } from '!types/RendererConfig';

import { renderChildren } from '!renderer/renderChildren';
import { isValidDataAttribute } from '!util/isValidDataAttribute';
import { RenderError } from '!errors/RenderError';
import { isValidCompositeAttribute } from '!util/isValidCompositeAttribute';

export const renderChild = <RenderTarget>(
  config: RendererConfig<RenderTarget>,
  ast: AstChild<DynamicSegments<RenderTarget>> & { type: ChildType.Node }
): RenderTarget => {
  const el = config.createElement(ast.tag);
  for (const attr of ast.attributes) {
    if (attr.type === AttributeType.Text) {
      el.setAttribute(attr.key, attr.value);
      continue;
    }
    if (isValidDataAttribute(attr)) {
      switch (typeof attr.value) {
        case 'string':
        case 'number':
          el.setAttribute(attr.key, String(attr.value));
          break;
        case 'object':
          const Value = attr.value;
          createEffect(() => {
            el.setAttribute(attr.key, String(Value.get()));
          });
          break;
        case 'function':
          el.addEventListener(attr.key, attr.value);
          break;
        default:
          throw new RenderError(
            `Invalid attribute data. Expected a number, string, function, or a subscribable. But got "${attr.value}"`
          );
      }
    } else if (isValidCompositeAttribute(attr)) {
      const values = attr.value;
      createEffect(() => {
        el.setAttribute(
          attr.key,
          values
            .map((v) =>
              String(typeof v.value === 'object' ? v.value.get() : v.value)
            )
            .join('')
        );
      });
    } else {
      throw new RenderError(
        `Invalid attribute data. Expected a number, string, or a subscribable. But got "${attr.value}"`
      );
    }
  }
  el.appendChildren(...renderChildren(config, ast));
  return el.getRenderTarget();
};
