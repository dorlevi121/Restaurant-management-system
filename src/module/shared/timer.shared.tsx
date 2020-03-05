import React, {useEffect, useState} from "react";

interface OwnProps {
    time: number
}

const Timer: React.FC<OwnProps> = (props) => {
    const [time, setTime] = useState(props.time);

    useEffect(() => {
        const x = setInterval(() => {
            tick();
            if (time === 0) return;
        }, 1000);
        return () => clearInterval(x);
    });

    const tick = () => setTime(time - 1);

    const toMin = (time: number) => {
        let timer = Math.floor(time), minutes, seconds;
        minutes = parseInt(String(timer / 60), 10);
        seconds = parseInt(String(timer % 60), 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (timer < 0) return;
        return minutes + ":" + seconds;
    }

    return (
        <div style={{color: 'white'}}>
            {toMin(time)}
        </div>
    );
}

export default Timer;
