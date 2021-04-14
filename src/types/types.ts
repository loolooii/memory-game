export type GameStatus = "not_started" | "started" | "won" | "lost";
export interface CardInfo {
  avatarUrl: string;
  avatarId: string;
  randomId: number;
  visible: boolean;
}
