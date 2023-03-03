import React from "react";
import { v4 as uuid } from "uuid";
import { RevivableElementArray } from "../validators";
import ComponentReviver from "../component-reviver";
import { RevivableComponentType } from "../types";

interface ChildrenReviverProps {
  children?: RevivableComponentType[];
}

function ChildrenReviver({ children }: ChildrenReviverProps) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children && children.map((item) => (
        <ComponentReviver
          type={item.type}
          props={item.props}
          key={`ChildrenReviver-${item.type}-${item.id || uuid()}`}
        >
          <ChildrenReviver>{item.children}</ChildrenReviver>
        </ComponentReviver>
      ))}
    </>
  );
}

ChildrenReviver.propTypes = {
  children: RevivableElementArray,
}

ChildrenReviver.defaultProps = {
  children: [],
}

export default ChildrenReviver;
