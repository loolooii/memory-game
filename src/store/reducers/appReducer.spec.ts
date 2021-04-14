import { AppState } from "../../types/types";
import appReducer, {
  setError,
  setLoading,
  setStatus,
  updateScore,
} from "./appReducer";

describe("APP REDUCER", () => {
  const initialState: AppState = {
    loading: false,
    error: "",
    score: 0,
    status: "not_started",
    cards: [],
  };
  it("should set loading state correctly", () => {
    const updatedState = appReducer(initialState, setLoading(true));
    expect(updatedState.loading).toEqual(true);
    const updatedState2 = appReducer(updatedState, setLoading(false));
    expect(updatedState2.loading).toEqual(false);
  });

  it("should set error correctly", () => {
    const updatedState = appReducer(initialState, setError("ERROR"));
    expect(updatedState.error).toEqual("ERROR");
  });

  it("should update score correctly correctly", () => {
    const updatedState = appReducer(initialState, updateScore(100));
    expect(updatedState.score).toEqual(100);
    const wonState = appReducer(updatedState, updateScore(500));
    expect(wonState.score).toEqual(600);
    expect(wonState.status).toEqual("won");
  });

  it("should set status correctly", () => {
    const wonState = appReducer(initialState, setStatus("won"));
    expect(wonState.status).toEqual("won");

    const notStartedState = appReducer(initialState, setStatus("not_started"));
    expect(notStartedState.status).toEqual("not_started");

    const startedState = appReducer(initialState, setStatus("started"));
    expect(startedState.status).toEqual("started");

    const lostState = appReducer(initialState, setStatus("lost"));
    expect(lostState.status).toEqual("lost");
  });
});

export {};
