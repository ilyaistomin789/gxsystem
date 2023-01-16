import FontSize from "../FontSize"


test("FontSize file has snapshots", () => {
  expect(FontSize).toMatchSnapshot();
})