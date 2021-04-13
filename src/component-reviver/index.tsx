import React from "react";
import PropTypes from "prop-types";
import { useReviverRegistry } from "../reviver-registry";

interface ComponentReviverProps {
  type: string;
  props: object;
  children: React.ReactNode,
}

const ComponentReviver: React.FC<ComponentReviverProps> = ({ type, props, children }) => {
  const registry = useReviverRegistry();
  const Component = registry.resolve(type);
  return (
    <Component {...props}>{children}</Component>
  );
};

ComponentReviver.propTypes = {
  type: PropTypes.string.isRequired,
  props: PropTypes.shape({}),
  children: PropTypes.node,
};

ComponentReviver.defaultProps = {
  props: {},
  children: null,
};

export default ComponentReviver;
