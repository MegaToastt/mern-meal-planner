import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMeal } from "../../redux/actions/mealActions";
import MealAddCheckbox from "./MealAddCheckbox";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const MealListAddForm = ({ isAuthenticated, addMeal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientList, setIngredientList] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    addMeal({ name, description, ingredients: ingredientList });
  };

  const addIngredient = ingredient => {
    if (ingredient === "") return;
    for (let i = 0; i < ingredientList.length; i++)
      if (ingredientList[i].name.toLowerCase() === ingredient.toLowerCase())
        return;
    setIngredientList([...ingredientList, { name: ingredient }]);
  };

  return (
    <PerfectScrollbar style={{ flex: 1 }}>
      <div className="MealListAddForm form-container">
        {isAuthenticated && <Redirect to="/" />}
        <h2>Add Meal</h2>
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

MealListAddForm.propTypes = {
  addMeal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addMeal }
)(MealListAddForm);
