import { render, fireEvent, waitFor } from "test-utils";
import userEvent from "@testing-library/user-event";
import Game from "pages/Game/Game";

const getAvatarId = (img: Element) => {
  const splitAltText = img.getAttribute("alt")?.split(" ") || [];
  return splitAltText[splitAltText.length - 1];
};
describe("<Game />", () => {
  jest.useRealTimers();
  it("should show loader after clicking start button and render grid", async () => {
    const { getByText, getByRole, getByTestId, getAllByRole } = render(
      <Game />
    );

    const button = getByText("start game");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    const loadingSpinner = getByRole("progressbar");
    expect(loadingSpinner).toBeInTheDocument();

    const grid = await waitFor(() => getByTestId("grid"));
    expect(grid).toBeInTheDocument();

    const buttons = getAllByRole("button");

    const firstButton = buttons[0];
    const firstAvatarId = getAvatarId(firstButton?.firstElementChild!);

    const matchingCard = buttons
      .slice(1)
      .find(
        (button) => getAvatarId(button.firstElementChild!) === firstAvatarId
      );

    userEvent.click(firstButton!);
    userEvent.click(matchingCard!);

    const nonMatchingCard = buttons
      .slice(1)
      .find(
        (button) => getAvatarId(button.firstElementChild!) !== firstAvatarId
      );
    userEvent.click(firstButton!);
    userEvent.click(nonMatchingCard!);
  });
});
