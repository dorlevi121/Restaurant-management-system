import React from 'react';
import kitchenStyle from './kitchen.module.scss';

import { OrderState } from '../../../../../store/Order/order.types';
import {numberOfCookingStands} from '../../../../../config/config';


interface Props {
    order: OrderState
}

const Kitchen: React.FC <Props> = (props) => {

    return (
        <div className={kitchenStyle.Kitchen}>

        </div>
    );
}

export default Kitchen;