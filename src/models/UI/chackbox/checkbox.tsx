import React, {useState} from 'react'
import checkboxStyle from './checkbox.module.scss';


interface Props {
    id: number,
    checkUserType: (e: any) => void,
    isChecked: boolean,
    value: string
}

export const CheckBox: React.FC<Props> = props => {
    return (
        <li  className={checkboxStyle.checkbox}>
            <input className={checkboxStyle.check} key={props.id} onChange={props.checkUserType}
                   type="checkbox" checked={props.isChecked} value={props.value}/> {props.value}
        </li>
    )
}

export default CheckBox