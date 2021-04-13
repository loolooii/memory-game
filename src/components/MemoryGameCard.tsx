import { FC } from "react";
import { Card, CardActionArea, makeStyles } from "@material-ui/core";

interface MemoryGameCardProps {
  cardId: string;
  image: string;
  onClick: (cardId: string) => void;
}
const useStyles = makeStyles(() => ({
  root: {
    aspectRatio: "1",
  },
  clickableArea: {
    height: "100%",
  },
}));
const MemoryGameCard: FC<MemoryGameCardProps> = ({
  cardId,
  image,
  onClick,
}) => {
  const { clickableArea, root } = useStyles();

  return (
    <Card classes={{ root }} onClick={() => onClick(cardId)}>
      <CardActionArea className={clickableArea}>
        <img alt={`Memory game card ${cardId}`} src={image} />
      </CardActionArea>
    </Card>
  );
};

export default MemoryGameCard;
