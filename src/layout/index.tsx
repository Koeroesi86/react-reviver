import React from "react";
import * as PropTypes from "prop-types";
import ChildrenReviver from "../children-reviver";
import { RevivableElement } from "../validators";
import { RevivableComponentType } from "../types";

export interface LayoutProps {
  data: RevivableComponentType[] | RevivableComponentType;
}

function ReviverLayout({ data }: LayoutProps) {
  return (
    <ChildrenReviver>{Array.isArray(data) ? data : [data]}</ChildrenReviver>
  );
}

ReviverLayout.propTypes = {
  // @ts-ignore TODO
  data: PropTypes.oneOfType([
    RevivableElement,
    PropTypes.arrayOf(RevivableElement),
  ]).isRequired,
};

export default ReviverLayout;