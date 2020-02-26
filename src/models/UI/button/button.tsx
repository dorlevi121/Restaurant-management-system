import React from "react";
import buttonStyle from './button.module.scss';

interface Props {
    text: string
}

const button: React.FC<Props> = (props) => {
    return (
        <button className={buttonStyle.button}>
            <p>{props.text}</p>
        </button>
    )
}

export default button;