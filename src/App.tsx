import { FC } from 'react';
import { Grid } from '@material-ui/core';
import PageContainer from 'components/PageContainer/PageContainer';
import Header from 'components/Header/Header';
import Game from 'pages/Game';

const App: FC = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header title="Github Memory" />
      </Grid>
      <Grid item>
        <PageContainer>
          <Game />
        </PageContainer>
      </Grid>
    </Grid>
  );
};

export default App;
