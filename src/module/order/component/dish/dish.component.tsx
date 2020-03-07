import React from "react";
import dishStyle from "./dish.module.scss";
import { DishInterface } from "../../../../models/system/dish.model";

interface Props {
  dish: DishInterface;
  addToQueue?: (id: number) => void;
}

const DishComponent: React.FC<Props> = (props: Props) => {
  return (
    <div className={dishStyle.Dish}>
      <h2 className={dishStyle.TitleDish}>{props.dish.title}</h2>
      <img src={props.dish.image} alt={props.dish.title} />
    </div>
  );
};

export default DishComponent;
