import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MealInfoControls from "./MealInfoControls";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const MealListInfo = ({ currentMeal }) => {
  if (currentMeal)
    return (
      <PerfectScrollbar style={{ flex: 1 }}>
        <div className="MealInfo main-container">
          <h2>{currentMeal.name}</h2>
          {currentMeal.description && (
            <Fragment>
              <h3>Description</h3>
              <p>{currentMeal.description}</p>
            </Fragment>
          )}
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
          <MealInfoControls />
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
