import React, { useState } from "react";
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
    <div className="MealAddCheckbox">
      <label htmlFor="ingredient">Ingredients</label>
      <div
        className={
          "inline-input ingredient-checkbox" +
          (ingredientList.length > 0 ? " populated" : "")
        }
      >
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
          <li key={ing.name}>{ing.name}</li>
        ))}
      </ul>
    </div>
  );
};

MealAddCheckbox.propTypes = {
  ingredientList: PropTypes.array.isRequired,
  addIngredient: PropTypes.func.isRequired
};

export default MealAddCheckbox;
