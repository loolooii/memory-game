import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import initialState from "store/initalState";
import { CardInfo, GameStatus } from "types/types";
import getAvatars from "services/getAvatars";
import { transformAvatars } from "utils/helpers";

export const getCards = createAsyncThunk(
  "getCards",
  async (): Promise<CardInfo[]> => {
    const avatars = await getAvatars();
    return transformAvatars(avatars);
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
      if (state.status === "started") {
        state.score = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "started";
        state.cards = action.payload;
      })
      .addCase(getCards.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong fetching cards data";
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
