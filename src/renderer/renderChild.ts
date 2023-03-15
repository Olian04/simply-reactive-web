import { AstChild, AttributeType, ChildType } from 'xml-template-literal';
import { createEffect } from 'simply-reactive';

import type { DynamicSegments } from '!types/DynamicSegments';
import type { RendererConfig } from '!types/RendererConfig';

import { renderChildren } from '!renderer/renderChildren';
import { isValidDataAttribute } from '!util/isValidDataAttribute';
import { RenderError } from '!errors/RenderError';

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
    if (!isValidDataAttribute(attr)) {
      throw new RenderError(
        `Invalid attribute data. Expected a number, string, or a subscribable. But got "${attr.value}"`
      );
    }
    if (typeof attr.value === 'string') {
      el.setAttribute(attr.key, attr.value);
    } else if (typeof attr.value === 'number') {
      el.setAttribute(attr.key, String(attr.value));
    } else if (
      typeof attr.value === 'object' &&
      attr.value !== null &&
      'get' in attr.value &&
      'subscribe' in attr.value
    ) {
      const Value = attr.value;
      createEffect(() => {
        el.setAttribute(attr.key, String(Value.get()));
      });
    } else if (typeof attr.value === 'function') {
      el.addEventListener(attr.key, attr.value);
    }
  }
  el.appendChildren(...renderChildren(config, ast));
  return el.getRenderTarget();
};
