import React from "react";
import modalStyle from './modal.module.scss';

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
                <div className={modalStyle.border}>
                    <span onClick={() => props.closeModal()} className={modalStyle.close}>&times;</span>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal;