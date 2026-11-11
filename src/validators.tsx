import * as PropTypes from "prop-types";
import { RevivableComponentType } from "./types";

const elementShape: PropTypes.ValidationMap<RevivableComponentType> = {
  // @ts-ignore @types/prop-types nullability
  type: PropTypes.string.isRequired,
  // @ts-ignore @types/prop-types nullability
  id: PropTypes.string,
  // @ts-ignore @types/prop-types nullability
  props: PropTypes.shape({}),
  // @ts-ignore TODO
  children: PropTypes.arrayOf(PropTypes.shape({})),
};

export const RevivableElement = PropTypes.shape<PropTypes.ValidationMap<RevivableComponentType>>(elementShape);

export const RevivableElementArray = PropTypes.arrayOf(RevivableElement);
