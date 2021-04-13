import { FC } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import MemoryGameCard from "../components/MemoryGameCard";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { selectIsLoading, setLoading } from "../reducers/appReducer";
import {
  selectScore,
  selectStatus,
  updateScore,
  setStatus,
} from "../reducers/gameReducer";

const useStyles = makeStyles(() => ({
  grid: {
    display: "grid",
    columnGap: 5,
    rowGap: 5,
  },
  mobileGrid: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
  },
  desktopGrid: {
    justifyContent: "center",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
  },
}));

const Game: FC = () => {
  const { grid, mobileGrid, desktopGrid } = useStyles();
  const theme = useTheme();
  const isDesktopOrTablet = useMediaQuery(theme.breakpoints.up("sm"));
  const loading = useAppSelector(selectIsLoading);
  const score = useAppSelector(selectScore);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  // TODO: countdown and dynamic score
  const time = "60 seconds";
  // const score = 500;
  return (
    <>
      <Button onClick={() => dispatch(setLoading(true))}>start loading</Button>

      {loading && <CircularProgress />}
      <div
        className={clsx([grid, isDesktopOrTablet ? desktopGrid : mobileGrid])}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((key) => (
          <MemoryGameCard
            key={key}
            cardId={key.toString()}
            image="dadwaddwa"
            onClick={() => dispatch(updateScore(10))}
          />
        ))}
      </div>
      <Grid container justify="space-between">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Time: {time}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" align={isDesktopOrTablet ? "right" : "left"}>
            Score: {score}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Game;
