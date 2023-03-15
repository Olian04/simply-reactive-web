import { DynamicAttribute, DynamicSegments } from '!types/DynamicSegments';
import {
  AstAttribute,
  AstAttributeComposite,
  AstKind,
  AttributeType,
} from 'xml-template-literal';

export const isValidCompositeAttribute = (
  attr: AstAttribute<DynamicSegments<unknown>>
): attr is {
  kind: AstKind.Attribute;
  type: AttributeType.Composite;
  key: string;
  value: AstAttributeComposite<
    Exclude<DynamicAttribute, (ev: Event) => void>
  >[];
} =>
  attr.type === AttributeType.Composite &&
  Array.isArray(attr.value) &&
  !attr.value.some(
    (v) => typeof v.value === 'function' || Array.isArray(v.value)
  );
