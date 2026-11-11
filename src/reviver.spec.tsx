import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { ReviverLayout, ReviverProvider } from "./index";

describe("reviver", () => {
  it("renders void elements without children", () => {
    const { container } = render(
      <ReviverProvider components={{ input: "input", br: "br" }}>
        <ReviverLayout data={[{ type: "input", props: { name: "a" } }, { type: "br" }]} />
      </ReviverProvider>
    );

    expect(container.innerHTML).toBe('<input name="a"><br>');
  });

  it("does not resolve prototype keys and warns once per alias", () => {
    const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    const data = [{ type: "constructor" }, { type: "missing-once" }];
    const { container, rerender } = render(
      <ReviverProvider components={{}}><ReviverLayout data={data} /></ReviverProvider>
    );
    rerender(<ReviverProvider components={{}}><ReviverLayout data={[...data]} /></ReviverProvider>);

    expect(container.innerHTML).toBe("");
    expect(warn).toHaveBeenCalledTimes(2);
    warn.mockRestore();
  });

  it("does not remount unknown aliases or skip-render unchanged subtrees", () => {
    const mounts = jest.fn();
    const renders = jest.fn();
    function Leaf({ text }: { text: string }) {
      renders();
      useEffect(() => mounts(), []);
      return <i>{text}</i>;
    }
    const components = { leaf: Leaf };
    const leaf = { type: "leaf", id: "1", props: { text: "x" } };
    const view = (data: object[]) => (
      <ReviverProvider components={components}><ReviverLayout data={data as never} /></ReviverProvider>
    );
    jest.spyOn(console, "warn").mockImplementation(() => undefined);

    const { rerender } = render(view([leaf, { type: "unknown", id: "u" }]));
    rerender(view([leaf, { type: "unknown", id: "u" }]));

    expect(mounts).toHaveBeenCalledTimes(1);
    expect(renders).toHaveBeenCalledTimes(1);
  });
});
