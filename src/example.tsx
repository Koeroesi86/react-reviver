/* eslint-disable react/prop-types */
import React from "react";
import { createRoot } from "react-dom/client";
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

const rootElement = document.getElementById("root");

if (window && rootElement) {
  createRoot(rootElement).render(
    <ReviverProvider components={components}>
      Example:
      <ReviverLayout data={layout} />
    </ReviverProvider>
  );
}