import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CardInfo, GameStatus } from "../../types/types";

interface AppState {
  loading: boolean;
  error: string;
  score: number;
  status: GameStatus;
  cards: CardInfo[];
}

const initialState: AppState = {
  loading: false,
  error: "",
  score: 0,
  status: "not_started",
  cards: [],
};

export const getAvatars = createAsyncThunk(
  "getAvatars",
  async (): Promise<CardInfo[]> => {
    const result = await fetch(
      "https://api.github.com/repos/facebook/react/contributors?per_page=25"
    ).then((response) => response.json());

    const cards = result.map((item: any) => {
      return {
        avatarUrl: item.avatar_url,
        avatarId: item.node_id,
        visible: false,
        randomId: 0,
      } as CardInfo;
    });
    return cards;
  }
);

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
      if (state.score === 600) {
        state.status = "won";
      }
    },
    setStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAvatars.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAvatars.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "started";
        state.cards = action.payload;
      });
  },
});

export const { setLoading, setError, updateScore, setStatus } = slice.actions;
export const selectIsLoading = (state: RootState) => state.app.loading;
export const selectError = (state: RootState) => state.app.error;
export const selectScore = (state: RootState) => state.app.score;
export const selectStatus = (state: RootState) => state.app.status;
export const selectCards = (state: RootState) => state.app.cards;

export default slice.reducer;