import { v4 as uuid4 } from "uuid";
import { CardInfo, GithubContributor, SelectedCard } from "types/types";

export const transformAvatars = (response: GithubContributor[]): CardInfo[] =>
  response.map((item) => {
    return {
      avatarUrl: item.avatar_url,
      avatarId: item.node_id,
      visible: false,
      uniqueId: "",
    };
  });

export const dealCards = (array: CardInfo[], n: number) => {
  const allShuffled = [...array].sort(() => 0.5 - Math.random());
  const subArray = [...allShuffled].slice(0, n);
  const duplicated = [...subArray, ...subArray];
  const result = duplicated.sort(() => 0.5 - Math.random());
  return result.map((avatar) => {
    return { ...avatar, uniqueId: uuid4() };
  });
};

export const hideCards = (
  cardsList: CardInfo[],
  selectedCards: SelectedCard[]
) =>
  cardsList.map((card) => {
    if (
      selectedCards.map((selected) => selected.avatarId).includes(card.avatarId)
    ) {
      return { ...card, visible: false };
    }
    return card;
  });

export const revealCard = (cardsList: CardInfo[], uniqueId: string) =>
  cardsList.map((card) => {
    if (card.uniqueId === uniqueId) {
      return { ...card, visible: true };
    }
    return card;
  });
