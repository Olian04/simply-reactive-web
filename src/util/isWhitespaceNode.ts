import { AstChild, ChildType } from "xml-template-literal";

export const isWhitespaceNode = (node: AstChild<unknown>) => {
  if (node.type !== ChildType.Text) {
    return false;
  }
  return node.value.trim().length === 0;
}
