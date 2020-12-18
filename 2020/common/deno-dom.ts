import * as denoDom from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

// monkeypatch some missing functionality in deno-dom
Object.defineProperties(denoDom.Node.prototype, {
  firstChild: {
    configurable: true,
    enumerable: true,
    get() {
      return this.childNodes[0];
    },
  },
  cloneNode: {
    configurable: true,
    enumerable: true,
    value() {
      return this;
    },
  },
});

export * from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
