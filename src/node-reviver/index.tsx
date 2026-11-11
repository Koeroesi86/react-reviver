import React, { memo } from "react";
import { useReviverRegistry } from "../reviver-registry";
import { RevivableComponentType } from "../types";

interface NodeReviverProps {
  node: RevivableComponentType;
}

const getNodeKey = ({ type, id }: RevivableComponentType, index: number) =>
  `${type}-${id ? `id-${id}` : `index-${index}`}`;

export default function reviveNodes(nodes: RevivableComponentType[]) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return nodes.map((node, index) => <NodeReviver key={getNodeKey(node, index)} node={node} />);
}

/**
 * Memoized by node reference: updating a layout immutably (keeping unchanged
 * subtrees as the same objects) skips re-rendering those subtrees.
 */
function Node({ node }: NodeReviverProps) {
  const Component = useReviverRegistry().resolve(node.type);

  // Leaves get no children at all, so void elements such as `input` or `br` work.
  return node.children?.length
    ? <Component {...node.props}>{reviveNodes(node.children)}</Component>
    : <Component {...node.props} />;
}

const NodeReviver = memo(Node);
