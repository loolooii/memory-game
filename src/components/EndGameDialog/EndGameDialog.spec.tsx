import { render } from '@testing-library/react';
import EndGameDialog from './EndGameDialog';

describe('<EndGameDialog />', () => {
  const score = 600;
  const onButtonClick = jest.fn();

  it('should show winning message', () => {
    const status = 'won';
    const { getByText } = render(
      <EndGameDialog
        status={status}
        score={score}
        onButtonClick={onButtonClick}
      />
    );
    const displayedMessage = getByText('YOU WON! :)');
    expect(displayedMessage).toBeInTheDocument();
  });

  it('should show losing message', () => {
    const status = 'lost';
    const { getByText } = render(
      <EndGameDialog
        status={status}
        score={score}
        onButtonClick={onButtonClick}
      />
    );
    const displayedMessage = getByText('GAME OVER! :(');
    expect(displayedMessage).toBeInTheDocument();
  });
});
