export class RenderError extends SyntaxError {
  constructor(msg: string) {
    super(`RenderError: ${msg}`);
  }
}
