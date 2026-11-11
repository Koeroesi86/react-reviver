/* Node.js example: server-side renders a layout with the built package. Run `npm run build` first. */
const http = require("node:http");
const React = require("react");
const { renderToString } = require("react-dom/server");
const { ReviverProvider, ReviverLayout } = require("../dist/package");

const port = Number(process.env.PORT) || 8080;

const components = {
  wrapper: ({ children, background }) => React.createElement("div", { style: { backgroundColor: background } }, children),
  hello: ({ text }) => React.createElement("h1", null, text),
};

const layout = {
  type: "wrapper",
  props: { background: "#efefef" },
  children: [{ type: "hello", props: { text: "It works!" }, children: [] }],
};

const render = () => renderToString(
  React.createElement(ReviverProvider, { components },
    React.createElement(ReviverLayout, { data: layout }))
);

http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Example usage</title>
</head>
<body>
  <div id="root">${render()}</div>
</body>
</html>`);
}).listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example running at http://localhost:${port}`);
});
