import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

const MealAddCheckbox = ({ ingredientList, addIngredient }) => {
  const [ingredient, setIngredient] = useState("");

  const handleClick = e => {
    e.preventDefault();
    addIngredient(ingredient);
    setIngredient("");
  };

  // disable form submit and add ingredient instead if ENTER is pressed
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient(ingredient);
      setIngredient("");
    }
  };

  return (
    <Fragment>
      <label htmlFor="ingredient">Ingredients</label>
      <div className="inline-input">
        <input
          type="text"
          name="ingredient"
          onChange={e => setIngredient(e.target.value)}
          onKeyPress={e => handleKeyPress(e)}
          value={ingredient}
        />
        <button type="button" onClick={handleClick}>
          Add
        </button>
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
