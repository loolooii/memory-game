import { render } from "test-utils";
import PageContainer from "./PageContainer";

describe("<PageContainer />", () => {
  it("should exist", () => {
    const { getByTestId } = render(<PageContainer />);
    const element = getByTestId("page-container");
    expect(element).toBeInTheDocument();
  });
});
