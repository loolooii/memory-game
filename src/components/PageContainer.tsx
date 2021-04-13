import { FC } from "react";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 40,
  },
}));

const PageContainer: FC = ({ children }) => {
  const { container } = useStyles();
  return (
    <Container className={container} maxWidth="md">
      <>{children}</>
    </Container>
  );
};

export default PageContainer;
