import React from "react";
import notificationsStyle from './notifications.module.scss';

interface Props {
    title: string,
    notificationsNumber: number
}

let style = {
    pointerEvents: 'none',
    cursor: 'default'
}as React.CSSProperties;

const notifications:React.FC <Props>= (props) => {

    if(props.notificationsNumber > 0) style = { pointerEvents: 'fill',cursor: 'pointer'}
    return(
        <div  style={style}>
            <a href="# " className={notificationsStyle.notification}>
                <span>{props.title}</span>
                <span className={notificationsStyle.badge}>{props.notificationsNumber}</span>
            </a>
        </div>
    )
}

export default notifications;