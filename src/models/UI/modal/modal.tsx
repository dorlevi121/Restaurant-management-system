import React, {useState} from "react";
import {OrderType} from "../../system/order.model";
import modalStyle from './modal.module.scss';
import OrderModal from "./order/moda-order.modal";

interface Props {
    show: boolean,
    closeModal: () => void,
    children: React.ReactNode
}

const Modal: React.FC<Props> = (props) => {

    let showHideClassName = props.show || props.show === null ? {display: 'block'} : {display: 'none'};

    return (
        <div className={modalStyle.modal} style={showHideClassName}>
            <div className={modalStyle.modalContent}>
                <span onClick={() => props.closeModal()} className={modalStyle.close}>&times;</span>
                {props.children}
            </div>
        </div>
    )
}

export default Modal;