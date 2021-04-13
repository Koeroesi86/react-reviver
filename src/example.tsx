/* eslint-disable react/prop-types */
import React from "react";
import ReactDOM from "react-dom";
import { ReviverProvider, ReviverLayout} from "./index";
import { ComponentRegistry, RevivableComponentType } from "./types";

const components: ComponentRegistry = {
  wrapper: ({ children, background }) => <div style={{ backgroundColor: background }}>{children}</div>,
  hello: ({ text }) => <h1>{text}</h1>,
}

type RevivableComponent =
  | RevivableComponentType<"wrapper", { background: string }, RevivableComponent>
  | RevivableComponentType<"hello", { text: string }, RevivableComponent>;

const layout: RevivableComponent = {
  type: "wrapper",
  props: { background: "#efefef" },
  children: [
    { type: "hello", props: { text: "It works!" } },
  ]
};

if (window) {
  ReactDOM.render(
    <ReviverProvider components={components}>
      <ReviverLayout data={layout}/>
    </ReviverProvider>,
    document.getElementById("root"),
  );
}