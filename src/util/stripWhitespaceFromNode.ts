import { AstChild, AstKind, ChildType } from "xml-template-literal";

export const stripWhitespaceFromNode = <T>(node: AstChild<T>): typeof node => {
  if (node.type !== ChildType.Text) return node;
  const lenBeforeLeft = node.value.length;
  node.value = node.value.trimStart();
  const lenAfterLeft = node.value.length;

  const lenBeforeRight = node.value.length;
  node.value = node.value.trimEnd();
  const lenAfterRight = node.value.length;

  return {
    kind: AstKind.Child,
    type: ChildType.Text,
    value: `${lenBeforeLeft - lenAfterLeft === 0 ? '' : ' '}${node.value}${lenBeforeRight - lenAfterRight === 0 ? '' : ' '}`
  }
}
