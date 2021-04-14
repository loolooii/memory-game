import { CardInfo } from "../types/types";

export const dealCards = (array: CardInfo[], n: number) => {
  const allShuffled = [...array].sort(() => 0.5 - Math.random());
  const subArray = [...allShuffled].slice(0, n);
  const duplicated = [...subArray, ...subArray];
  const result = duplicated.sort(() => 0.5 - Math.random());

  return result.map((avatar) => {
    return { ...avatar, randomId: Math.floor(Math.random() * 1000) + 1 };
  });
};

export const hideCards = (cardsList: CardInfo[], selectedCards: string[]) =>
  cardsList.map((card) => {
    if (selectedCards.includes(card.avatarId)) {
      return { ...card, visible: false };
    }
    return card;
  });

export const revealCard = (cardsList: CardInfo[], randomId: number) =>
  cardsList.map((card) => {
    if (card.randomId === randomId) {
      return { ...card, visible: true };
    }
    return card;
  });
