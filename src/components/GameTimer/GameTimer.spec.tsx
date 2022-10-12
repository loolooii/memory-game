import {render} from 'test-utils';
import GameTimer from "./GameTimer";

describe('GameTimer test', function () {

    it('should render',  () => {
        const {container} = render(<GameTimer/>);
        expect(container).toBeInTheDocument();
    });
});