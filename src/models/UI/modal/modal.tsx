import React from "react";
import modalStyle from './modal.module.scss';
import {OrderState} from "../../../store/Order/order.types";

interface Props {
    order?: OrderState
}
const modal: React.FC <Props> = (props) => {
    return(
        <div id="myModal" className="modal">
            <div className={modalStyle.modal}>
                <div className={modalStyle.header}>
                    <span className={modalStyle.close}>&times;</span>
                    <h2>Modal Header</h2>
                </div>
                <div className={modalStyle.body}>
                    <p>Some text in the Modal Body</p>
                    <p>Some other text...</p>
                </div>
                <div className={modalStyle.footer}>
                    <h3>Modal Footer</h3>
                </div>
            </div>

        </div>
    )
}

export default modal;