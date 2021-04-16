export interface GithubContributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: false;
  contributions: number;
}
export interface AppState {
  loading: boolean;
  error: string;
  score: number;
  status: GameStatus;
  cards: CardInfo[];
}
export type GameStatus = "not_started" | "started" | "won" | "lost";
export interface CardInfo {
  avatarUrl: string;
  avatarId: string;
  uniqueId: string;
  visible: boolean;
}
export interface SelectedCard {
  avatarId: string;
  uniqueId: string;
}
