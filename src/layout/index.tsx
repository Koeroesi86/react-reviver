import React from "react";
import { reviveNodes } from "../node-reviver";
import { RevivableComponentType } from "../types";

export interface LayoutProps {
  data: RevivableComponentType[] | RevivableComponentType;
}

function ReviverLayout({ data }: LayoutProps) {
  return <>{reviveNodes(Array.isArray(data) ? data : [data])}</>;
}

export default ReviverLayout;
