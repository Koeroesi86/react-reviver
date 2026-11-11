# @koeroesi86/react-reviver
[![Publish](https://github.com/Koeroesi86/react-reviver/actions/workflows/publish.yml/badge.svg)](https://github.com/Koeroesi86/react-reviver/actions/workflows/publish.yml) [![npm version](https://badge.fury.io/js/%40koeroesi86%2Freact-reviver.svg)](https://badge.fury.io/js/%40koeroesi86%2Freact-reviver)

Render React trees from plain JSON-like data. Register components by alias, then pass a layout of `{ type, props, children }` nodes to `ReviverLayout`.

### Requirements
* [NodeJS](https://nodejs.org/en/) 18+ (development)
* `react` >= 16.8.0 (peer dependency; CI tests 16.8, 17, 18 and 19). `react` is also a devDependency of this package.

### API
* `ReviverProvider` — provides the component registry (`components` prop: alias → component or HTML tag name).
* `ReviverLayout` — renders `data`, a single node or an array of nodes.
* `RevivableComponentType<Type, Props, Child>` — node type: `{ type, id?, props?, children? }`.
* `ComponentRegistry` — `{ [alias]: component }`. Unregistered aliases log a warning and render nothing.

### Usage

```shell
npm install @koeroesi86/react-reviver
```

Requires `react` >= 16.8.0 (hooks) as a peer dependency. CI smoke-tests React 16.8, 17, 18 and 19.

```typescript jsx
/* eslint-disable react/prop-types */
import React from "react";
import { createRoot } from "react-dom/client";
import { ReviverProvider, ReviverLayout, ComponentRegistry, RevivableComponentType } from "@koeroesi86/react-reviver";

export const components: ComponentRegistry = {
  wrapper: ({ children, background }) => <div style={{ backgroundColor: background }}>{children}</div>,
  hello: ({ text }) => <h1>{text}</h1>,
}

type RevivableComponent =
  | RevivableComponentType<"wrapper", { background: string }, RevivableComponent>
  | RevivableComponentType<"hello", { text: string }, RevivableComponent>;

export const layout: RevivableComponent = {
  type: "wrapper",
  props: { background: "#efefef" },
  children: [
    { type: "hello", props: { text: "It works!" }, children: [] },
  ]
};

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <ReviverProvider components={components}>
      Example:
      <ReviverLayout data={layout} />
    </ReviverProvider>,
  );
}
```

### Development

```shell
npm ci
npm run lint
npm test
npm run build   # dts bundle + webpack into ./dist
npm run dev     # build + webpack watch
```

Open [example/index.html](example/index.html) in the browser.
