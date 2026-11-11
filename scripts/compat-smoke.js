/* Smoke test of the built package against the currently installed React version. */
const assert = require("node:assert");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { ReviverProvider, ReviverLayout } = require("../dist/package");

const components = {
  wrapper: ({ children, background }) => React.createElement("div", { style: { backgroundColor: background } }, children),
  hello: ({ text }) => React.createElement("h1", null, text),
};

const layout = {
  type: "wrapper",
  props: { background: "#efefef" },
  children: [{ type: "hello", props: { text: "It works!" }, children: [] }],
};

const html = renderToStaticMarkup(
  React.createElement(ReviverProvider, { components },
    React.createElement(ReviverLayout, { data: layout }))
);

assert.match(html, /<h1>It works!<\/h1>/);
// eslint-disable-next-line no-console
console.log(`OK with react@${React.version}: ${html}`);
