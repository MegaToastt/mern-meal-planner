import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editMeal } from "../../redux/actions/mealActions";
import MealAddCheckbox from "./MealAddCheckbox";

const MealListEditForm = ({ isAuthenticated, editMeal, currentMeal }) => {
  const [name, setName] = useState(currentMeal.name);
  const [description, setDescription] = useState(currentMeal.description);
  const [ingredientList, setIngredientList] = useState(
    currentMeal.ingredients.map(ing => ({ name: ing.name, _id: ing._id }))
  );

  // useEffect(() => {
  // setName(currentMeal.name);
  // setDescription(currentMeal.description);
  // setIngredientList(currentMeal.ingredients.map(ing => ing.name));
  // }, []);

  const handleSubmit = e => {
    e.preventDefault();
    editMeal({
      _id: currentMeal._id,
      name,
      description,
      ingredients: ingredientList
    });
  };

  const addIngredient = ingredient => {
    if (ingredient === "") return;
    for (let i = 0; i < ingredientList.length; i++)
      if (ingredientList[i].name.toLowerCase() === ingredient.toLowerCase())
        return;
    setIngredientList([...ingredientList, { name: ingredient, _id: null }]);
  };

  return (
    <div className="MealListEditForm form-container">
      {isAuthenticated && <Redirect to="/" />}
      <h2>Edit Meal</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        <MealAddCheckbox
          ingredientList={ingredientList}
          addIngredient={addIngredient}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

MealListEditForm.propTypes = {
  editMeal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  currentMeal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentMeal: state.meal.currentMeal
});

export default connect(
  mapStateToProps,
  { editMeal }
)(MealListEditForm);