import React from "react";
import kitchenStyle from "./kitchen.module.scss";
import { DishInterface } from "../../../../models/system/dish.model";
import { IngredientInterface } from "../../../../models/system/ingredients.model";
import Timer from "../../../shared/timer.shared";
import { spawn } from "child_process";

interface OwnProps {
  dishesList: DishInterface[];
}

const Kitchen: React.FC<OwnProps> = props => {
  return (
    <div className={kitchenStyle.KitchenModule}>
      {props.dishesList.map((dish: DishInterface, i: number) => {
        return (
          <div key={Math.random()} className={kitchenStyle.Stand}>
            <div className={kitchenStyle.DishHeader}>
              <p>Title: {dish.title} </p>
              <p> Order ID: {dish.orderId}</p>
            </div>
            <div className={kitchenStyle.Ingredients}>
              {dish.ingredients.map((i: IngredientInterface) => {
                return (
                  <div key={Math.random()} className={kitchenStyle.Ingredient}>
                    <img src={i.image} alt={i.title} />
                 {i.amountInDish > 1 ? (
                      <span className={kitchenStyle.ingAmount}>
                        &#10007;{i.amountInDish}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className={kitchenStyle.Time}>
              <div>
                <p>Time:</p>
                <Timer
                  time={
                    dish.duration -
                    Math.abs(dish.kitchenEntryTime - Date.now()) / 1000
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className={kitchenStyle.Content}>
        <div className={kitchenStyle.Meal}>
          <div className={kitchenStyle.DishImg}>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
