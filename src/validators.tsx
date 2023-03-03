import * as PropTypes from "prop-types";
import { RevivableComponentType } from "./types";

const elementShape: PropTypes.ValidationMap<RevivableComponentType> = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  props: PropTypes.shape({}),
  // @ts-ignore TODO
  children: PropTypes.arrayOf(PropTypes.shape({})),
};

export const RevivableElement = PropTypes.shape<PropTypes.ValidationMap<RevivableComponentType>>(elementShape);

export const RevivableElementArray = PropTypes.arrayOf(RevivableElement);
