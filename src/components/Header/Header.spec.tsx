import { render } from "test-utils";
import Header from "./Header";

describe("<Header />", () => {
  const title = "some title";

  it("should show header title", () => {
    const { getByText } = render(<Header title={title} />);
    const displayedTitle = getByText("some title");
    expect(displayedTitle).toBeInTheDocument();
  });
});
