import { render } from "@testing-library/react";
import React from "react";
import { ReviverLayout, ReviverProvider } from "./index";
import { components, layout } from "./example";

describe("example render", () => {
  it("should render", () => {
    const result = render(
      <ReviverProvider components={components}>
        Example:
        <ReviverLayout data={layout}/>
      </ReviverProvider>
    );

    expect(result.asFragment()).toMatchSnapshot();
  });
})