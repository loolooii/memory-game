import { FC } from "react";
import { Card, CardActionArea, makeStyles, CardMedia } from "@material-ui/core";

interface MemoryGameCardProps {
  cardId: string;
  image: string;
  visible: boolean;
  onClick: () => void;
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
  visible,
  onClick,
}) => {
  const { clickableArea, root } = useStyles();

  return (
    <Card classes={{ root }} onClick={onClick}>
      <CardActionArea className={clickableArea}>
        {visible ? (
          <CardMedia
            component="img"
            alt={`Memory game card ${cardId}`}
            image={image}
          />
        ) : (
          <p>****</p>
        )}
      </CardActionArea>
    </Card>
  );
};

export default MemoryGameCard;
