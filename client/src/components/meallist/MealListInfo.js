import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MealInfoControls from "./MealInfoControls";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import MealList from "./MealList";

const MealListInfo = ({ currentMeal }) => {
  return (
    <div className="MealInfo">
      <MealList />
      <PerfectScrollbar style={{ flex: 1 }}>
        <div className="MealInfo-main main-container">
          {!currentMeal ? (
            <p>No meal selected.</p>
          ) : (
            <Fragment>
              <div className="Mealinfo-main-header">
                <h2>{currentMeal.name}</h2>
              </div>
              <div className="MealInfo-main-info">
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
            </Fragment>
          )}
        </div>
      </PerfectScrollbar>
    </div>
  );
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
