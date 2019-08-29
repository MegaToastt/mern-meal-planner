import React, { useState } from "react";
import PropTypes from "prop-types";
import MealAddCheckbox from "./MealAddCheckbox";
import FloatingLabelInput from "./FloatingLabelInput";

const MealForm = ({ handleSubmit, currentMeal }) => {
  const [name, setName] = useState(currentMeal ? currentMeal.name : "");
  const [description, setDescription] = useState(
    currentMeal ? currentMeal.description : ""
  );
  const [ingredientList, setIngredientList] = useState(
    currentMeal ? currentMeal.ingredients : []
  );
  const [calories, setCalories] = useState(
    currentMeal ? currentMeal.calories : ""
  );
  const [protein, setProtein] = useState(
    currentMeal ? currentMeal.protein : ""
  );
  const [fat, setFat] = useState(currentMeal ? currentMeal.fat : "");
  const [carbs, setCarbs] = useState(currentMeal ? currentMeal.carbs : "");

  const getMeal = () => ({
    ...currentMeal,
    name,
    description,
    ingredients: ingredientList,
    calories,
    protein,
    fat,
    carbs
  });

  const addIngredient = ingredient => {
    if (ingredient === "") return;
    for (let i = 0; i < ingredientList.length; i++)
      if (ingredientList[i].name.toLowerCase() === ingredient.toLowerCase())
        return;
    setIngredientList([...ingredientList, { name: ingredient }]);
  };

  const removeIngredient = name => {
    setIngredientList(ingredientList.filter(ing => ing.name !== name));
  };

  return (
    <form onSubmit={e => handleSubmit(e, getMeal())} className="form">
      <FloatingLabelInput
        name="name"
        title="Name"
        type="text"
        onChange={e => setName(e.target.value)}
        value={name}
      />
      <FloatingLabelInput
        name="description"
        title="Description"
        type="text"
        onChange={e => setDescription(e.target.value)}
        value={description}
      />
      <MealAddCheckbox
        ingredientList={ingredientList}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
      />
      <FloatingLabelInput
        name="calories"
        type="number"
        title="Calories"
        onChange={e => setCalories(e.target.value)}
        value={calories}
      />
      <FloatingLabelInput
        name="protein"
        type="number"
        title="Protein"
        onChange={e => setProtein(e.target.value)}
        value={protein}
      />
      <FloatingLabelInput
        name="fat"
        type="number"
        title="Fat"
        onChange={e => setFat(e.target.value)}
        value={fat}
      />
      <FloatingLabelInput
        name="carbs"
        type="number"
        title="Carbs"
        onChange={e => setCarbs(e.target.value)}
        value={carbs}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

MealForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  currentMeal: PropTypes.object
};

export default MealForm;
