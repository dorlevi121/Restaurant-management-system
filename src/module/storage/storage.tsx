import React, {Component} from "react";
import storageStyle from "./storage.module.scss";
import composition from "../../utils/composition";
import {connect} from "react-redux";
import {getBudget, getIngredientsQuantity} from "../../store/storage/storage.selectors";
import {Dispatch} from "redux";
import {StorageState} from "../../store/storage/storage.types";
import StorageInput from "../../models/UI/input/storage-input/storage-input.input";
import {cloneDeep} from "lodash";
import Button from "../../models/UI/button/button";
import {refillIngredients} from "../../store/storage/storage.actions";
import {initialIngredientsPrice} from "../../config/config";
import Alert from "../../models/UI/alert/alert";
import {ingIcons} from "../../constants/images";


interface State {
    refill: { [titile: string]: number };
    budget: number;
    showAlert: boolean;
    msgAlert: string;
    typeAlert: "success" | "danger";
}

interface OwnProps {
}

interface PropsFromState {
    getAllIngredients: { [titile: string]: number };
    getBudget: number;
}

interface PropsFromDispatch {
    updateIngredients: typeof refillIngredients;
}

type AllProps = OwnProps & PropsFromState & PropsFromDispatch;

class Storage extends Component<AllProps, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            refill: this.props.getAllIngredients,
            budget: this.props.getBudget,
            showAlert: false,
            msgAlert: "",
            typeAlert: "danger"
        };
    }

    // Each click on minus or plus button changes the ingredients in the state
    updateIngredients = (e: any, ingredientTitle: string): void => {
        const newRefill = cloneDeep(this.state.refill);
        let newBudget = this.state.budget;
        switch (e.target.value) {
            case "+": {
                newRefill[ingredientTitle]++;
                newBudget -= initialIngredientsPrice[ingredientTitle];
                if (newBudget < 0) {
                    this.setState({
                        showAlert: true,
                        typeAlert: "danger",
                        msgAlert: "You have exceeded your budget"
                    });
                    setTimeout(() => {
                        this.setState({showAlert: false, msgAlert: ""});
                    }, 4000);
                }
                break;
            }

            case "-": {
                if (
                    newRefill[ingredientTitle] <=
                    this.props.getAllIngredients[ingredientTitle]
                ) {
                    return;
                }
                newRefill[ingredientTitle]--;
                newBudget += initialIngredientsPrice[ingredientTitle];
                break;
            }
        }
        this.setState({refill: newRefill, budget: newBudget});
    };

    // Update the ingredients quantity in store
    updateStore = () => {
        this.setState({
            showAlert: true,
            typeAlert: "success",
            msgAlert: "The order was successful"
        });
        setTimeout(() => {
            this.setState({showAlert: false, msgAlert: ""});
        }, 4000);
        this.props.updateIngredients(this.state.refill);
    };

    render() {
        const ingTitle = Object.keys(this.state.refill);
        const ingQuantity = Object.values(this.state.refill);
        const budgetColor =
            this.state.budget > 0 ? {color: "rgb(52, 72, 90)"} : {color: "red"};

        return (
            <div className={storageStyle.Storage}>
                <div className={storageStyle.Budget} style={budgetColor}>
                    <p>Budget:</p>
                    <p> {this.state.budget}&#36;</p>
                </div>

                {this.state.showAlert && (
                    <div className={storageStyle.Alert}>
                        <Alert
                            msg={this.state.msgAlert}
                            type={this.state.typeAlert}
                            show={this.state.showAlert}
                        />
                    </div>
                )}
                {ingTitle.map((title, i) => (
                    <div key={Math.random()} className={storageStyle.Content}>
                        <div className={storageStyle.Title}>
                          <img src={ingIcons[title]} alt={title}/>
                          <p>{title} </p>
                        </div>
                        <StorageInput
                            ingredientAmount={ingQuantity[i]}
                            updateIngredients={this.updateIngredients}
                            title={title}
                        />
                    </div>
                ))}
                <div className={storageStyle.Button} onClick={this.updateStore}>
                    <Button text="Order"/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: StorageState) => ({
    getAllIngredients: getIngredientsQuantity(state),
    getBudget: getBudget(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    updateIngredients: (ingredients: { [titile: string]: number }) =>
        dispatch(refillIngredients(ingredients))
});

export default composition<OwnProps>(
    // @ts-ignore
    Storage,
    connect(mapStateToProps, mapDispatchToProps)
);
