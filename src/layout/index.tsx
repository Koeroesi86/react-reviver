import React from "react";
import PropTypes from "prop-types";
import ChildrenReviver from "../children-reviver";
import { RevivableElement } from "../validators";
import { RevivableComponentType } from "../types";

export interface LayoutProps {
  data: RevivableComponentType[] | RevivableComponentType;
}

const ReviverLayout: React.FC<LayoutProps> = ({ data }) => (
  <ChildrenReviver>{Array.isArray(data) ? data : [data]}</ChildrenReviver>
);

ReviverLayout.propTypes = {
  // @ts-ignore TODO
  data: PropTypes.oneOfType([
    RevivableElement,
    PropTypes.arrayOf(RevivableElement),
  ]).isRequired,
};

export default ReviverLayout;