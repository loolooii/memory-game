const getAvatars = async () => {
  return fetch(
    "https://api.github.com/repos/facebook/react/contributors?per_page=25"
  ).then((response) => response.json());
};

export default getAvatars;
