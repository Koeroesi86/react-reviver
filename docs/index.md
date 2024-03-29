[![Publish](https://github.com/Koeroesi86/react-reviver/actions/workflows/publish.yml/badge.svg)](https://github.com/Koeroesi86/react-reviver/actions/workflows/publish.yml) [![npm version](https://badge.fury.io/js/%40koeroesi86%2Freact-reviver.svg)](https://badge.fury.io/js/%40koeroesi86%2Freact-reviver)

### Install

```shell
yarn add @koeroesi86/react-reviver
```

### Usage example

{% highlight tsx linenos %}
/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import { ComponentRegistry, RevivableComponentType, ReviverLayout, ReviverProvider } from "@koeroesi86/react-reviver";

export const components: ComponentRegistry = {
  wrapper: ({ children, background }) => <div style={{ backgroundColor: background }}>{children}</div>,
  hello: ({ text }) => <h1>{text}</h1>
};

type RevivableComponent =
  | RevivableComponentType<"wrapper", { background: string }, RevivableComponent>
  | RevivableComponentType<"hello", { text: string }, RevivableComponent>;

export const layout: RevivableComponent = {
  type: "wrapper",
  props: { background: "#efefef" },
  children: [
    { type: "hello", props: { text: "It works!" }, children: [] }
  ]
};

if (window && document.getElementById("root")) {
  ReactDOM.render(
    <ReviverProvider components={components}>
      Example:
      <ReviverLayout data={layout} />
    </ReviverProvider>,
    document.getElementById("root")
  );
}
{% endhighlight %}
