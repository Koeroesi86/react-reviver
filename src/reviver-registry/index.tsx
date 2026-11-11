import React, { useContext, useMemo } from "react";
import {
  ComponentRegistry,
  RegistryContextType,
  ReviverRegistryProviderProps
} from "../types";

// Stable identity: a fresh component per resolve() would remount the node on every render.
function NullComponent() {
  return null;
}
const warnedAliases = new Set<string>();

const createRegistry = (components: ComponentRegistry): RegistryContextType => ({
  resolve: (alias) => {
    if (Object.prototype.hasOwnProperty.call(components, alias)) {
      return components[alias];
    }

    if (!warnedAliases.has(alias)) {
      warnedAliases.add(alias);
      // eslint-disable-next-line no-console
      console.warn(`Alias not registered: ${alias}`);
    }
    return NullComponent;
  },
});

export const ReviverRegistryContext = React.createContext(createRegistry({}));

export function ReviverRegistryProvider({
  children = null, components,
}: ReviverRegistryProviderProps) {
  const registry = useMemo(() => createRegistry(components), [components]);
  return (
    <ReviverRegistryContext.Provider value={registry}>
      {children}
    </ReviverRegistryContext.Provider>
  );
}

export const useReviverRegistry = () => useContext(ReviverRegistryContext);
