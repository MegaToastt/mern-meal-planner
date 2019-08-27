import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editMeal } from "../../redux/actions/mealActions";
import MealAddCheckbox from "./MealAddCheckbox";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const MealListEditForm = ({ isAuthenticated, editMeal, currentMeal }) => {
  const [name, setName] = useState(currentMeal.name);
  const [description, setDescription] = useState(currentMeal.description);
  const [ingredientList, setIngredientList] = useState(
    currentMeal.ingredients.map(ing => ({ name: ing.name, _id: ing._id }))
  );

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
    <PerfectScrollbar style={{ flex: 1 }}>
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
    </PerfectScrollbar>
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
