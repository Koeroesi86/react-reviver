import React from "react";
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
      {children && children.map((item, index) => (
        <ComponentReviver
          type={item.type}
          props={item.props}
          key={`ChildrenReviver-${item.type}-${item.id ? `id-${item.id}` : `index-${index}`}`}
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
