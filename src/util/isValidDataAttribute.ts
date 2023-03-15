import { DynamicAttribute, DynamicSegments } from '!types/DynamicSegments';
import { AstAttribute, AttributeType } from 'xml-template-literal';

export const isValidDataAttribute = (
  attr: AstAttribute<DynamicSegments<unknown>>
): attr is AstAttribute<DynamicAttribute> & {
  type: AttributeType.Data;
} => attr.type === AttributeType.Data && !Array.isArray(attr.value);
