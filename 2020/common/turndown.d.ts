import type { Node } from "./deno-dom.ts";

export class TurndownService {
  constructor(options?: { [key: string]: string | boolean });

  turndown(input: string | Node): string;

  keep(filter: string | string[] | ((node: Node) => boolean)): this;
}

export default TurndownService;
