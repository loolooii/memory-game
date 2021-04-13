import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type GameStatus = "finished" | "not_started" | "ongoing";

interface GameState {
  score: number;
  status: GameStatus;
}

const initialState: GameState = {
  score: 0,
  status: "not_started",
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    setStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { updateScore, setStatus } = slice.actions;
export const selectScore = (state: RootState) => state.game.score;
export const selectStatus = (state: RootState) => state.game.status;

export default slice.reducer;
