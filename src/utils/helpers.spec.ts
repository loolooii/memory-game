import { dealCards, hideCards, revealCard } from "./helpers";

describe("HELPER FUNCTIONS", () => {
  it("should hide 2 selected (wrong) cards", () => {
    const testCardsList = [
      {
        avatarUrl: "url1",
        avatarId: "id1",
        randomId: 111,
        visible: true,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        randomId: 222,
        visible: true,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        randomId: 333,
        visible: true,
      },
    ];

    const testSelectedCards = ["id1", "id2"];
    const expectedCardsList = [
      {
        avatarUrl: "url1",
        avatarId: "id1",
        randomId: 111,
        visible: false,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        randomId: 222,
        visible: false,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        randomId: 333,
        visible: true,
      },
    ];

    expect(hideCards(testCardsList, testSelectedCards)).toEqual(
      expectedCardsList
    );
  });

  it("should reveal the requested card", () => {
    const testCardsList = [
      {
        avatarUrl: "url1",
        avatarId: "id1",
        randomId: 111,
        visible: false,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        randomId: 222,
        visible: false,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        randomId: 333,
        visible: false,
      },
    ];

    const randomId = 222;

    const expectedCardsList = [
      {
        avatarUrl: "url1",
        avatarId: "id1",
        randomId: 111,
        visible: false,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        randomId: 222,
        visible: true,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        randomId: 333,
        visible: false,
      },
    ];

    expect(revealCard(testCardsList, randomId)).toEqual(expectedCardsList);
  });

  it("should deal cards correctly", () => {
    const testCardsList = [
      {
        avatarUrl: "url1",
        avatarId: "id1",
        randomId: 111,
        visible: false,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        randomId: 222,
        visible: false,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        randomId: 333,
        visible: false,
      },
      {
        avatarUrl: "url4",
        avatarId: "id4",
        randomId: 444,
        visible: false,
      },
    ];

    expect(dealCards(testCardsList, 2)).toHaveLength(4);
    expect(
      new Set(dealCards(testCardsList, 2).map((card) => card.avatarId)).size
    ).toEqual(2);
  });
});

export {};
