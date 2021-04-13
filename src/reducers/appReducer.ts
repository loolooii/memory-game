import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { AvatarInfo } from "../types/types";

type GameStatus = "finished" | "not_started" | "ongoing";
interface AppState {
  loading: boolean;
  error: string;
  score: number;
  status: GameStatus;
  avatars: AvatarInfo[];
}

const initialState: AppState = {
  loading: false,
  error: "",
  score: 0,
  status: "not_started",
  avatars: [],
};

export const getAvatars = createAsyncThunk(
  "game/getAvatars",
  async (): Promise<AvatarInfo[]> => {
    const result = await fetch(
      "https://api.github.com/repos/facebook/react/contributors?per_page=25"
    ).then((response) => response.json());

    const avatars = result.map((item: any) => {
      return {
        url: item.avatar_url,
        id: item.node_id,
        visible: false,
        randomId: 0,
      } as AvatarInfo;
    });
    return avatars;
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
        state.status = "ongoing";
        state.avatars = action.payload;
      });
  },
});

export const { setLoading, setError, updateScore, setStatus } = slice.actions;
export const selectIsLoading = (state: RootState) => state.app.loading;
export const selectError = (state: RootState) => state.app.error;
export const selectScore = (state: RootState) => state.app.score;
export const selectStatus = (state: RootState) => state.app.status;
export const selectAvatars = (state: RootState) => state.app.avatars;

export default slice.reducer;
