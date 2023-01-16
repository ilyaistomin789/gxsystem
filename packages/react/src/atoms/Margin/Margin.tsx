import React from "react";
import { Spacing } from "@gxsys/foundation";

export interface MarginProps {
  space?: keyof typeof Spacing;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  children?: React.ReactNode;
}

const Margin: React.FC<MarginProps> = ({
  space = "xxxs",
  children,
  left,
  right,
  top,
  bottom,
}) => {
  let className =
    !left && !right && !top && !bottom ? `gxs-margin-${space}` : ``;

  if (left) {
    className = `${className} gxs-margin-left-${space}`;
  }

  if (right) {
    className = `${className} gxs-margin-right-${space}`;
  }

  if (top) {
    className = `${className} gxs-margin-top-${space}`;
  }

  if (bottom) {
    className = `${className} gxs-margin-bottom-${space}`;
  }

  return <div className={className}>{children}</div>;
};

export default Margin;
