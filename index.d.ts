import React from "react";
import { LayoutProps } from "./src/layout";
import { ReviverRegistryProviderProps } from "./src";

declare module "@koeroesi86/react-reviver" {
  type RevivableComponentLike = RevivableComponentType;
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

  export type ReviverProvider = React.FC<ReviverRegistryProviderProps>;

  export type ReviverLayout = React.FC<LayoutProps>;
}