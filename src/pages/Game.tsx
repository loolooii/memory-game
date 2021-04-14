import { FC, useEffect, useState } from "react";
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
import {
  selectIsLoading,
  selectScore,
  selectStatus,
  selectCards,
  updateScore,
  getAvatars,
} from "../store/reducers/appReducer";
import { CardInfo } from "../types/types";
import { dealCards, hideCards, revealCard } from "../utils/helpers";
import EndGameDialog from "../components/EndGameDialog";

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
  const cards = useAppSelector(selectCards);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  // TODO: countdown
  const time = "60 seconds";
  const [cardsList, setCardsList] = useState<CardInfo[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  useEffect(() => {
    setCardsList(dealCards(cards, 6));
  }, [cards]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0] === selectedCards[1]) {
        dispatch(updateScore(100));
      } else {
        setTimeout(() => {
          setCardsList(hideCards(cardsList, selectedCards));
        }, 2000);
      }
      setSelectedCards([]);
    }
  }, [selectedCards, dispatch, cardsList]);

  const handleCardClick = (randomId: number, cardId: string) => {
    setSelectedCards((prev) => [...prev, cardId]);
    setCardsList(revealCard(cardsList, randomId));
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <EndGameDialog status={status} onButtonClick={() => {}} score={score} />
      {status === "not_started" ? (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Button
              onClick={() => dispatch(getAvatars())}
              variant="contained"
              color="primary"
            >
              start game
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>
          <div
            className={clsx([
              grid,
              isDesktopOrTablet ? desktopGrid : mobileGrid,
            ])}
          >
            {cardsList.map((card, index) => (
              <MemoryGameCard
                key={card.avatarId + index}
                cardId={card.avatarId}
                image={card.avatarUrl}
                visible={card.visible}
                onClick={() => handleCardClick(card.randomId, card.avatarId)}
              />
            ))}
          </div>
          <Grid container justify="space-between">
            <Grid item xs={12} sm={6}>
              <Typography variant="h4">Time: {time}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h4"
                align={isDesktopOrTablet ? "right" : "left"}
              >
                Score: {score}
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Game;
