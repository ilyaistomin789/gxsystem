import React from "react";
import { FontSize } from "@gxsys/foundation";

export interface TextProps {
  size?: keyof typeof FontSize;
  children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ size = FontSize.base, children }) => {
  const className = `gxs-text gxs-text-${size}`;

  return <p className={className}>{children}</p>;
};

export default Text;
