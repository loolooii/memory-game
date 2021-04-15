import { makeStyles, createStyles, Typography } from "@material-ui/core";
import { FC } from "react";

interface HeaderProps {
  title: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      textAlign: "center",
      padding: "16px 0",
      borderBottom: "1px solid #CCC",
    },
  })
);
const Header: FC<HeaderProps> = ({ title }) => {
  const { container } = useStyles();
  return (
    <div className={container}>
      <Typography variant="h3">{title}</Typography>
    </div>
  );
};

export default Header;
