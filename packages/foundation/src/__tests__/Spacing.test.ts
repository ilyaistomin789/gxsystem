import Spacing from "../Spacing"


test("Spacing file has snapshots", () => {
  expect(Spacing).toMatchSnapshot();
})