import React from "react";

const Checked: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
): React.ReactElement => (
  <svg
    fill="none"
    {...props}
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

export default Checked;
