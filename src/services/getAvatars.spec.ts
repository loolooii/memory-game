import getAvatars from "services/getAvatars";
import fetchMock from "fetch-mock-jest";
import { GithubContributor } from "types/types";
describe("getAvatars test", () => {
  const fakeData: GithubContributor[] = [
    {
      login: "zpao",
      id: 8445,
      node_id: "MDQ6VXNlcjg0NDU=",
      avatar_url: "https://avatars.githubusercontent.com/u/8445?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/zpao",
      html_url: "https://github.com/zpao",
      followers_url: "https://api.github.com/users/zpao/followers",
      following_url: "https://api.github.com/users/zpao/following{/other_user}",
      gists_url: "https://api.github.com/users/zpao/gists{/gist_id}",
      starred_url: "https://api.github.com/users/zpao/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/zpao/subscriptions",
      organizations_url: "https://api.github.com/users/zpao/orgs",
      repos_url: "https://api.github.com/users/zpao/repos",
      events_url: "https://api.github.com/users/zpao/events{/privacy}",
      received_events_url: "https://api.github.com/users/zpao/received_events",
      type: "User",
      site_admin: false,
      contributions: 1778,
    },
  ];

  it("should get avatars", async () => {
    fetchMock.get(
      "https://api.github.com/repos/facebook/react/contributors?page=1&per_page=25",
      fakeData
    );
    expect(await getAvatars()).toEqual(fakeData);
  });
});
