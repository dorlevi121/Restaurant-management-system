import React from "react";
import modalStyle from './modal.module.scss';
import {OrderState} from "../../../store/Order/order.types";

interface Props {
    order: OrderState | null,
    show: boolean,
    closeModal: () => void
}
const modal: React.FC <Props> = (props) => {
    let showHideClassName = props.show || props.show===null ? {display: 'block'}: {display: 'none'};

    return(
            <div style={showHideClassName}>
                      <div id="myModal" className="modal">
            <div className={modalStyle.modal}>
                <div className={modalStyle.header}>
                    <span onClick={props.closeModal} className={modalStyle.close}>&times;</span>
                    <h2>{props.order?.dish?.title}</h2>
                </div>
                <div className={modalStyle.body}>
                    <p>Ingredients: {props.order?.dish?.ingredients}</p>
                     <p>Price: {props.order?.dish?.price}</p>
                </div>
                <div className={modalStyle.footer}>
                    <button>Cancel Order</button>
                </div>
            </div>
        </div>

            </div>
        )
}

export default modal;