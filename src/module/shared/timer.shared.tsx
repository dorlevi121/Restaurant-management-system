import React, {useEffect, useState} from "react";

interface OwnProps {
    time: number
}

const Timer: React.FC<OwnProps> = (props) => {

    const [time, setTime] = useState(props.time);
    useEffect(() => {
        console.log('s')
        setInterval(() => {
            setTime(time - 1);
            return;
        }, 1000);
    }, []);

    return (
        <div style={{color: 'white'}}>
            {time}
        </div>
    );
}

export default Timer;
