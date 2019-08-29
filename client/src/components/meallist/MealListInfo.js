import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MealInfoControls from "./MealInfoControls";
import Alertbox from "../Alertbox";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const MealListInfo = ({ currentMeal }) => {
  if (currentMeal)
    return (
      <PerfectScrollbar style={{ flex: 1 }}>
        <div className="MealInfo main-container">
          <div className="Mealinfo-header">
            <h2>{currentMeal.name}</h2>
          </div>
          <div className="MealInfo-info">
            {currentMeal.description && (
              <div className="MealInfo-section">
                <h3>Description</h3>
                <p>{currentMeal.description}</p>
              </div>
            )}
            <div className="MealInfo-section">
              <h3>Ingredients</h3>
              <ul>
                {currentMeal.ingredients.length ? (
                  currentMeal.ingredients.map(ing => (
                    <li key={ing._id}>{ing.name}</li>
                  ))
                ) : (
                  <li>No ingredients</li>
                )}
              </ul>
            </div>
            <div className="MealInfo-section">
              <h3>Nutrition</h3>
              <p>Calories: {currentMeal.calories}</p>
              <p>Protein: {currentMeal.protein}</p>
              <p>Fat: {currentMeal.fat}</p>
              <p>Carbs: {currentMeal.carbs}</p>
            </div>
            <div className="MealInfo-section">
              <MealInfoControls />
            </div>
          </div>
          <div className="MealInfo-stats">Stats here</div>
        </div>
      </PerfectScrollbar>
    );
  else return <div className="MealInfo main-container">No meal selected</div>;
};

MealListInfo.propTypes = {
  currentMeal: PropTypes.object
};

const mapStateToProps = state => ({
  currentMeal: state.meal.currentMeal
});

export default connect(
  mapStateToProps,
  null
)(MealListInfo);
