import React from "react";

const ChevronUp: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
): React.ReactElement => (
  <svg
    fill="none"
    {...props}
    stroke="currentColor"
    stroke-width="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    ></path>
  </svg>
);

export default ChevronUp;
