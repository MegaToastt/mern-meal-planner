import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MealAddCheckbox = ({ ingredientList, addIngredient }) => {
  const [ingredient, setIngredient] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused && ingredient !== "") setFocused(true);
  }[focused, ingredient]);

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
      <label htmlFor="ingredient" className={focused ? "focused" : ""}>
        Ingredients
      </label>
      <div
        className={
          "inline-input ingredient-checkbox" +
          (ingredientList.length ? " populated" : "")
        }
      >
        <input
          type="text"
          name="ingredient"
          onChange={e => setIngredient(e.target.value)}
          onKeyPress={e => handleKeyPress(e)}
          value={ingredient}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            if (ingredient === "") setFocused(false);
          }}
        />
        <button
          type="button"
          className={ingredient === "" ? "" : "text-entered"}
          onClick={handleClick}
        >
          Add
        </button>
      </div>
      <ul className="ingredients-list">
        {ingredientList.map(ing => (
          <li key={ing.name}>
            <span>{ing.name}</span>
          </li>
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
