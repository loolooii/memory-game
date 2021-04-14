import { FC } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { GameStatus } from "../types/types";

interface EndGameDialogProps {
  status: GameStatus;
  score: number;
  onButtonClick: () => void;
}

const EndGameDialog: FC<EndGameDialogProps> = ({
  status,
  score,
  onButtonClick,
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={status === "won" || status === "lost"}
      onClose={onButtonClick}
    >
      <DialogContent>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h2">
              {status === "won" ? "YOU WON! :)" : "GAME OVER! :("}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">{`Score: ${score}`}</Typography>
          </Grid>
          <Grid item>
            <Button onClick={onButtonClick} variant="outlined" color="primary">
              new game!
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EndGameDialog;
