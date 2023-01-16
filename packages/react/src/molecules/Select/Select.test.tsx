import React from "react";
import Select from "./Select";

import { fireEvent, render } from "@testing-library/react";

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

test("Check all items have menuitemradio role", () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);

  fireEvent.click(getByTestId("GxsSelectButton"));
  
  expect(getAllByRole("menuitemradio")).toHaveLength(options.length);
});
