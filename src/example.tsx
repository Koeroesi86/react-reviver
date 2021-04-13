/* eslint-disable react/prop-types */
import React, { FC } from "react";
import ReactDOM from "react-dom";
import { ReviverProvider, ReviverLayout} from "./index";
import { ComponentRegistry, RevivableComponentType } from "./types";

const Wrapper: FC<{ background: string }> = ({ children, background }) => (
  <div style={{ backgroundColor: background }}>{children}</div>
);
const Hello: FC<{ text: string }> = ({ text }) => <h1>{text}</h1>;

export const components: ComponentRegistry = {
  wrapper: Wrapper,
  hello: Hello,
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

if (window && document.getElementById("root")) {
  ReactDOM.render(
    <ReviverProvider components={components}>
      Example:
      <ReviverLayout data={layout}/>
    </ReviverProvider>,
    document.getElementById("root"),
  );
}