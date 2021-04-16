import { GithubContributor } from "types/types";

const getAvatars = async (): Promise<GithubContributor[]> => {
  return fetch(
    "https://api.github.com/repos/facebook/react/contributors?page=1&per_page=25"
  ).then((response) => response.json());
};

export default getAvatars;
