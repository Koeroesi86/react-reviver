import React from "react";
import { v4 as uuid } from "uuid";
import { RevivableElementArray } from "../validators";
import ComponentReviver from "../component-reviver";
import { RevivableComponentType } from "../types";

interface ChildrenReviverProps {
  children?: RevivableComponentType[];
}

const ChildrenReviver: React.FC<ChildrenReviverProps> = ({ children }) => (
  <>
    {children.map((item) => (
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

ChildrenReviver.propTypes = {
  // @ts-ignore TODO
  children: RevivableElementArray,
}

ChildrenReviver.defaultProps = {
  children: [],
}

export default ChildrenReviver;
