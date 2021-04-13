import { AvatarInfo } from "../types/types";

export const getElementsFromArray = (array: AvatarInfo[], n: number) => {
  const allShuffled = [...array].sort(() => 0.5 - Math.random());
  const subArray = [...allShuffled].slice(0, n);
  const duplicated = [...subArray, ...subArray];
  const result = duplicated.sort(() => 0.5 - Math.random());

  return result.map((avatar) => {
    return { ...avatar, randomId: Math.floor(Math.random() * 1000) + 1 };
  });
};
