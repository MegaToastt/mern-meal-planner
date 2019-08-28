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
      <div className="content">
        <div className="inputs">
          <div className="inline-input ingredient-checkbox">
            <input
              type="text"
              name="ingredient"
              onChange={e => setIngredient(e.target.value)}
              onKeyPress={e => handleKeyPress(e)}
              value={ingredient}
            />
            <button
              type="button"
              className={ingredient === "" ? "" : "text-entered"}
              onClick={handleClick}
            >
              Add
            </button>
          </div>
          <ul className="search-results"></ul>
        </div>
        <ul className="ingredients-list">
          {ingredientList.map(ing => (
            <li key={ing.name}>
              <span>{ing.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

MealAddCheckbox.propTypes = {
  ingredientList: PropTypes.array.isRequired,
  addIngredient: PropTypes.func.isRequired
};

export default MealAddCheckbox;
