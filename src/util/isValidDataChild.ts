import { DynamicChild, DynamicSegments } from '!types/DynamicSegments';
import {
  AstAttribute,
  AstChild,
  AttributeType,
  ChildType,
} from 'xml-template-literal';

export const isValidDataChild = <RenderTarget>(
  child: AstChild<DynamicSegments<RenderTarget>>
): child is AstChild<DynamicChild<RenderTarget>> & {
  type: ChildType.Data;
} => child.type === ChildType.Data && typeof child.value !== 'function';
