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
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fat, setFat] = useState(0);
  const [carbs, setCarbs] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    addMeal({
      name,
      description,
      ingredients: ingredientList,
      calories,
      protein,
      fat,
      carbs
    });
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
          <label htmlFor="calories">Calories</label>
          <input
            type="number"
            name="calories"
            onChange={e => setCalories(e.target.value)}
            value={calories}
          />
          <label htmlFor="protein">Protein</label>
          <input
            type="number"
            name="protein"
            onChange={e => setProtein(e.target.value)}
            value={protein}
          />
          <label htmlFor="fat">Fat</label>
          <input
            type="number"
            name="fat"
            onChange={e => setFat(e.target.value)}
            value={fat}
          />
          <label htmlFor="carbs">Carbs</label>
          <input
            type="number"
            name="carbs"
            onChange={e => setCarbs(e.target.value)}
            value={carbs}
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
