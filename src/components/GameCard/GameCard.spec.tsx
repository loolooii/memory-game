import { render } from "@testing-library/react";
import GameCard from "./GameCard";

describe("<GameCard />", () => {
  const cardId = "someId";
  const image = "someImg";
  const onClick = jest.fn();

  it("should show hidden image", () => {
    const disabled = false;
    const visible = false;
    const { getByAltText } = render(
      <GameCard
        cardId={cardId}
        image={image}
        onClick={onClick}
        visible={visible}
        disabled={disabled}
      />
    );
    const displayedImage = getByAltText(`Memory game card ${cardId}`);
    expect(displayedImage.getAttribute("src")).toContain("jpeg");
  });

  it("should show visible image", () => {
    const visible = true;
    const { getByAltText } = render(
      <GameCard
        cardId={cardId}
        image={image}
        onClick={onClick}
        visible={visible}
      />
    );
    const displayedImage = getByAltText(`Memory game card ${cardId}`);
    expect(displayedImage.getAttribute("src")).toContain(image);
  });
});
