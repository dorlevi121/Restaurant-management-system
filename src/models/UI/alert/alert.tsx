import React from 'react';
import './alert.css'

interface OwnProps {
    msg: string,
    type: string,
    show: boolean
}

const Alert: React.FC<OwnProps> = (props) => {
    let showHideClassName = props.show || props.show === null ? {display: 'block'} : {display: 'none'};

    return (
        <div style={showHideClassName}>
            <div className={`alert alert-${props.type}`}>
                {props.msg}
            </div>
        </div>
    );
};

export default Alert;