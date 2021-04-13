import { FC } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import MemoryGameCard from "../components/MemoryGameCard";

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
  // TODO: countdown and dynamic score
  const time = "60 seconds";
  const score = 500;
  return (
    <>
      <div
        className={clsx([grid, isDesktopOrTablet ? desktopGrid : mobileGrid])}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((key) => (
          <MemoryGameCard
            key={key}
            cardId={key.toString()}
            image="dadwaddwa"
            onClick={() => {}}
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
