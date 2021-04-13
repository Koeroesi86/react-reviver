import React from "react";

export type RevivableComponentLike = RevivableComponentType;

export interface RevivableComponentType<T = string, P = object, C extends RevivableComponentLike = RevivableComponentLike> {
  type: T;
  id?: string;
  props?: P;
  children?: C[];
}

export type RevivableReactComponent =
  | string
  // eslint-disable-next-line no-unused-vars
  | ((props: any, context?: any) => any)
  // eslint-disable-next-line no-unused-vars
  | (new (props: any, context?: any) => any);

export interface ComponentRegistry {
  [type: string]: RevivableReactComponent;
}

export interface RegistryContextType {
  resolve: (alias: string) => RevivableReactComponent
}

export interface ReviverRegistryProviderProps {
  components: { [type: string]: RevivableReactComponent };
  children: React.ReactNode;
}
