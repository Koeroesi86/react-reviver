import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  ComponentRegistry,
  RegistryContextType,
  RevivableReactComponent,
  ReviverRegistryProviderProps
} from "../types";

class RegistryContext implements RegistryContextType{
  private readonly components: ComponentRegistry;

  constructor(components: ComponentRegistry) {
    this.components = components;
  }

  resolve = (alias: string): RevivableReactComponent => {
    if (!this.components[alias]) {
      console.warn(`Alias not registered: ${alias}`)
      return () => null;
    }
    console.log("alias", alias)

    return this.components[alias];
  };
}

const context = new RegistryContext({});

export const ReviverRegistryContext = React.createContext(context);

export const ReviverRegistryProvider: React.FC<ReviverRegistryProviderProps> = ({
  children,
  components,
}) => (
  <ReviverRegistryContext.Provider value={new RegistryContext(components)}>
    {children}
  </ReviverRegistryContext.Provider>
);

ReviverRegistryProvider.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType).isRequired,
  children: PropTypes.node,
};

ReviverRegistryProvider.defaultProps = {
  children: null,
};

export const useReviverRegistry = () => useContext(ReviverRegistryContext);
