import React from "react";
import Select from "./Select";
import { withA11Y } from "@storybook/addon-a11y";
import "@gxsys/scss/lib/Select.css";

export default {
  title: "Molecules|Select",
  decorators: [withA11Y],
};

const options = [
  {
    label: "Black",
    value: "black",
  },
  {
    label: "White",
    value: "white",
  },
  {
    label: "Green",
    value: "green",
  },
];

export const Common = () => <Select options={options} />;
export const RenderCustomOptions = () => (
  <Select
    options={options}
    renderOption={({ getOptionRecommendedProps, option, isSelected }) => (
      <span {...getOptionRecommendedProps()}>
        {option.label} {isSelected ? "Current" : ""}
      </span>
    )}
  />
);

export const CustomLabel = () => <Select label="Label" options={options} />;
