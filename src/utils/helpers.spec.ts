import { GithubContributor } from "types/types";
import { dealCards, hideCards, revealCard, transformAvatars } from "./helpers";

describe("HELPER FUNCTIONS", () => {
  it("should transform avatars to cards", () => {
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
        following_url:
          "https://api.github.com/users/zpao/following{/other_user}",
        gists_url: "https://api.github.com/users/zpao/gists{/gist_id}",
        starred_url: "https://api.github.com/users/zpao/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/zpao/subscriptions",
        organizations_url: "https://api.github.com/users/zpao/orgs",
        repos_url: "https://api.github.com/users/zpao/repos",
        events_url: "https://api.github.com/users/zpao/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/zpao/received_events",
        type: "User",
        site_admin: false,
        contributions: 1778,
      },
    ];
    expect(transformAvatars(fakeData)[0].avatarUrl).toEqual(
      "https://avatars.githubusercontent.com/u/8445?v=4"
    );
    expect(transformAvatars(fakeData)[0].avatarId).toEqual("MDQ6VXNlcjg0NDU=");
    expect(transformAvatars(fakeData)[0].visible).toEqual(false);
  });

  it("should hide 2 selected (wrong) cards", () => {
    const testCardsList = [
      {
        avatarUrl: "url1",
        avatarId: "id1",
        uniqueId: "111",
        visible: true,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        uniqueId: "222",
        visible: true,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        uniqueId: "333",
        visible: true,
      },
    ];

    const testSelectedCards = [
      { avatarId: "id1", uniqueId: "111" },
      { avatarId: "id2", uniqueId: "222" },
    ];
    const expectedCardsList = [
      {
        avatarUrl: "url1",
        avatarId: "id1",
        uniqueId: "111",
        visible: false,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        uniqueId: "222",
        visible: false,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        uniqueId: "333",
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
        uniqueId: "111",
        visible: false,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        uniqueId: "222",
        visible: false,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        uniqueId: "333",
        visible: false,
      },
    ];

    const uniqueId = "222";

    const expectedCardsList = [
      {
        avatarUrl: "url1",
        avatarId: "id1",
        uniqueId: "111",
        visible: false,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        uniqueId: "222",
        visible: true,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        uniqueId: "333",
        visible: false,
      },
    ];

    expect(revealCard(testCardsList, uniqueId)).toEqual(expectedCardsList);
  });

  it("should deal cards correctly", () => {
    const testCardsList = [
      {
        avatarUrl: "url1",
        avatarId: "id1",
        uniqueId: "111",
        visible: false,
      },
      {
        avatarUrl: "url2",
        avatarId: "id2",
        uniqueId: "222",
        visible: false,
      },
      {
        avatarUrl: "url3",
        avatarId: "id3",
        uniqueId: "333",
        visible: false,
      },
      {
        avatarUrl: "url4",
        avatarId: "id4",
        uniqueId: "444",
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
