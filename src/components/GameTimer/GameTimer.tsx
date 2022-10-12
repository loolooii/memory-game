import {Typography} from "@material-ui/core";
import {useEffect, useRef, useState} from "react";
import {selectStatus, setStatus} from "../../store/reducers/appReducer";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {GAME_TIME} from "../../constants";

const GameTimer = () => {
    const [timeLeft, setTimeLeft] = useState<number>(GAME_TIME);
    const status = useAppSelector(selectStatus);
    const timerRef = useRef<number | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (timeLeft > 0 && status === "started") {
            timerRef.current = window.setTimeout(
                () => setTimeLeft(timeLeft - 1),
                1000
            );
        } else if (timeLeft === 0) {
            dispatch(setStatus("lost"));
        }
        return () => window.clearTimeout(timerRef.current!);
    }, [timeLeft, dispatch, status]);

    return <Typography variant="h4">Time: {timeLeft} seconds</Typography>;
}

export default GameTimer;