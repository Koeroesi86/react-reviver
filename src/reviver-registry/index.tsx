import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import {
  ComponentRegistry,
  RegistryContextType,
  RevivableReactComponent,
  ReviverRegistryProviderProps
} from "../types";

class RegistryContext implements RegistryContextType {
  private readonly components: ComponentRegistry;

  constructor(components: ComponentRegistry) {
    this.components = components;
  }

  resolve = (alias: string): RevivableReactComponent => {
    if (!this.components[alias]) {
      // eslint-disable-next-line no-console
      console.warn(`Alias not registered: ${alias}`)
      return () => null;
    }

    return this.components[alias];
  };
}

const context = new RegistryContext({});

export const ReviverRegistryContext = React.createContext(context);

export function ReviverRegistryProvider({
  children, components,
}: ReviverRegistryProviderProps) {
  const registry = useMemo(() => new RegistryContext(components), [components]);
  return (
    <ReviverRegistryContext.Provider value={registry}>
      {children}
    </ReviverRegistryContext.Provider>
  );
}

ReviverRegistryProvider.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType).isRequired,
  children: PropTypes.node,
};

ReviverRegistryProvider.defaultProps = {
  children: null,
};

export const useReviverRegistry = () => useContext(ReviverRegistryContext);
