import React from "react";
import * as PropTypes from "prop-types";
import { useReviverRegistry } from "../reviver-registry";

interface ComponentReviverProps {
  type: string;
  props: object;
  children: React.ReactNode,
}

function ComponentReviver({ type, props, children }: ComponentReviverProps) {
  const registry = useReviverRegistry();
  const Component = registry.resolve(type);
  return (
    <Component {...props}>{children}</Component>
  );
}

ComponentReviver.propTypes = {
  type: PropTypes.string.isRequired,
  props: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};

ComponentReviver.defaultProps = {
  props: {},
  children: null,
};

export default ComponentReviver;
