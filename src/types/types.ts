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
  randomId: number;
  visible: boolean;
}
