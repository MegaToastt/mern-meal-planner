import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

const MealAddCheckbox = ({ ingredientList, addIngredient }) => {
  const [ingredient, setIngredient] = useState("");

  const handleClick = e => {
    e.preventDefault();
    addIngredient(ingredient);
  };

  return (
    <Fragment>
      <label htmlFor="ingredient">Ingredients</label>
      <div className="inline-input">
        <input
          type="text"
          name="ingredient"
          onChange={e => setIngredient(e.target.value)}
          value={ingredient}
        />
        <button onClick={handleClick}>Add</button>
      </div>
      <ul>
        {ingredientList.map(ing => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>
    </Fragment>
  );
};

MealAddCheckbox.propTypes = {
  ingredientList: PropTypes.array.isRequired,
  addIngredient: PropTypes.func.isRequired
};

export default MealAddCheckbox;
