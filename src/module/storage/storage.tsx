import React, {Component} from "react";
import storageStyle from './storage.module.scss';
import composition from "../../utils/composition";
import {connect} from "react-redux";
import {getBudget, getIngredientsQuantity} from "../../store/storage/storage.selectors";
import {Dispatch} from "redux";
import {StorageState} from "../../store/storage/storage.types";
import StorageInput from "../../models/UI/input/storage-input/storage-input.input";
import {cloneDeep} from 'lodash';
import {initialIngredients} from "../../config/config";
import Button from "../../models/UI/button/button";
import {refillIngredients} from "../../store/storage/storage.actions";
import {IngredientInterface} from "../../models/system/ingredients.model";

interface State {
    refill: { [titile: string]: number }
}

interface OwnProps {
}

interface PropsFromState {
    getAllIngredients: { [titile: string]: number },
    getBudget: number
}

interface PropsFromDispatch {
    updateIngredients: typeof refillIngredients,
}

type AllProps = OwnProps
    & PropsFromState
    & PropsFromDispatch;

class Storage extends Component <AllProps, State> {
    constructor(props: any) {
        super(props);
        this.state = { refill: this.props.getAllIngredients,
        }
    }

    updateIngredients = (e: any, ingredientTitle: string): void => {
        const newRefill = cloneDeep(this.state.refill)
        switch (e.target.value) {
            case '+': {
                newRefill[ingredientTitle]++;
                break;
            }

            case '-': {
                newRefill[ingredientTitle]++;
                break;
            }
        }
        this.setState({refill: newRefill})
    }

    updateStore = () => {
        let b = 0;
        for (let key in this.state.refill){
            const q = this.state.refill[key] - this.props.getAllIngredients[key];
        }
        this.props.updateIngredients(this.state.refill)
    }

    render() {
        const ingTitle = Object.keys(this.state.refill);
        const ingQuantity = Object.values(this.state.refill);

        return (
            <div className={storageStyle.Storage}>
                {this.props.getBudget}
                {ingTitle.map((title, i) => (
                    <div key={Math.random()} className={storageStyle.Content}>
                        <p>{title}</p>
                        <StorageInput ingredientAmount={ingQuantity[i]}
                                      updateIngredients={this.updateIngredients}
                                      title={title}
                        />
                    </div>
                ))}
                <div onClick={this.updateStore}>
                    <Button text='Order'/>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: StorageState) => ({
    getAllIngredients: getIngredientsQuantity(state),
    getBudget: getBudget(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateIngredients: (ingredients: {[titile:string]: number}) => dispatch(refillIngredients(ingredients))
})


export default composition<OwnProps>(
    // @ts-ignore
    Storage,
    connect(mapStateToProps, mapDispatchToProps)
);