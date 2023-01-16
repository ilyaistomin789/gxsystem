import React from "react";
import { Spacing } from "@gxsys/foundation";

interface ColorProps {
  children?: React.ReactNode;
  hexCode?: string;
  width?: keyof typeof Spacing;
  height?: keyof typeof Spacing;
}

const Color: React.FC<ColorProps> = ({
  children,
  hexCode = "#fff",
  width = Spacing.sm,
  height = Spacing.sm,
}) => {
  const className = `gxs-color gxs-width-${width} gxs-height-${height}`;

  return (
    <div
      className={className}
      style={{
        backgroundColor: hexCode,
      }}
    >
      {children}
    </div>
  );
};

export default Color;
