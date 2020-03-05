import React from 'react';
import './alert.scss'

interface OwnProps {
    msg: string,
    type: 'danger' | 'success',
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