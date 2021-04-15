import { AppState } from "types/types";

const initialState: AppState = {
  loading: false,
  error: "",
  score: 0,
  status: "not_started",
  cards: [],
};

export default initialState;
