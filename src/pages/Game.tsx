import { FC, useEffect, useState } from 'react';
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import MemoryGameCard from 'components/GameCard/GameCard';
import { useAppSelector, useAppDispatch } from 'store/store';
import {
  selectIsLoading,
  selectScore,
  selectStatus,
  selectCards,
  updateScore,
  getCards,
  setStatus,
} from 'store/reducers/appReducer';
import { CardInfo, SelectedCard } from 'types/types';
import { dealCards, hideCards, revealCard } from 'utils/helpers';
import EndGameDialog from 'components/EndGameDialog/EndGameDialog';

const useStyles = makeStyles(() => ({
  grid: {
    display: 'grid',
    columnGap: 5,
    rowGap: 5,
  },
  mobileGrid: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: 'repeat(4, 1fr)',
  },
  desktopGrid: {
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
  },
}));

const GAME_TIME = 60;

const Game: FC = () => {
  const { grid, mobileGrid, desktopGrid } = useStyles();
  const theme = useTheme();
  const isDesktopOrTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const loading = useAppSelector(selectIsLoading);
  const score = useAppSelector(selectScore);
  const cards = useAppSelector(selectCards);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState<number>(GAME_TIME);
  const [cardsList, setCardsList] = useState<CardInfo[]>([]);
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

  // handles dealing cards
  useEffect(() => {
    setCardsList(dealCards(cards, 6));
  }, [cards]);

  // handles playing
  useEffect(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0].avatarId === selectedCards[1].avatarId) {
        dispatch(updateScore(100));
        setSelectedCards([]);
      } else {
        setTimeout(() => {
          setCardsList(hideCards(cardsList, selectedCards));
          setSelectedCards([]);
        }, 2000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCards, dispatch]);

  // handles timer
  useEffect(() => {
    if (timeLeft > 0 && status !== 'won' && status !== 'lost') {
      setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      dispatch(setStatus('lost'));
    }
    return () => clearInterval(timeLeft);
  }, [timeLeft, dispatch, status]);

  const startGame = () => {
    setTimeLeft(GAME_TIME);
    dispatch(setStatus('started'));
    dispatch(getCards());
  };

  const handleCardClick = (randomId: number, avatarId: string) => {
    setSelectedCards([...selectedCards, { avatarId, randomId }]);
    setCardsList(revealCard(cardsList, randomId));
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <EndGameDialog status={status} onButtonClick={startGame} score={score} />
      {status === 'not_started' ? (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Button
              onClick={() => dispatch(getCards())}
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
                disabled={
                  selectedCards.length === 2 ||
                  selectedCards
                    .map((selected) => selected.randomId)
                    .includes(card.randomId)
                }
                key={card.randomId}
                cardId={card.avatarId}
                image={card.avatarUrl}
                visible={card.visible}
                onClick={() => handleCardClick(card.randomId, card.avatarId)}
              />
            ))}
          </div>
          <Grid container justify="space-between">
            <Grid item xs={12} sm={6}>
              <Typography variant="h4">Time: {timeLeft} seconds</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h4"
                align={isDesktopOrTablet ? 'right' : 'left'}
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
