import React, { Component } from "react";
import dishesStyle from "./dishes.module.scss";
import menu from "../../../../constants/allDishes";
import DishComponent from "../dish/dish.component";
import Button from "../../../../models/UI/button/button";

interface Props {
  addNewDish: (dishId: number) => void;
}

interface State {
  selectedDish: number;
}

class Dishes extends Component<Props, State> {
  state: State = {
    selectedDish: 0
  };

  //arrow button to next dish
  nextDish = () => {
    const newSelectedDish = (this.state.selectedDish + 1) % menu.length;
    this.setState({ selectedDish: newSelectedDish });
  };

  render() {
    const selectedMenu = menu[this.state.selectedDish];

    return (
      <div className={dishesStyle.Root}>
        <div className={dishesStyle.Dishes}>
          <p className={dishesStyle.Arrow} onClick={this.nextDish}>
            &#10094;
          </p>
          <DishComponent key={selectedMenu.id} dish={selectedMenu} />
          <p className={dishesStyle.Arrow} onClick={this.nextDish}>
            &#x276f;
          </p>
        </div>

        <div
          className={dishesStyle.Button}
          onClick={() => this.props.addNewDish(this.state.selectedDish)}
        >
          <Button text="Add to cart" />
        </div>
      </div>
    );
  }
}

export default Dishes;
