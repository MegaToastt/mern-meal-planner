import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MealInfoControls from "./MealInfoControls";

const MealListInfo = ({ currentMeal }) => {
  if (currentMeal)
    return (
      <div className="MealInfo">
        <div className="heading">
          <h2>{currentMeal.name}</h2>
          <MealInfoControls />
        </div>
        {currentMeal.description && (
          <Fragment>
            <h3>Description</h3>
            <p>{currentMeal.description}</p>
          </Fragment>
        )}
        <h3>Ingredients</h3>
        <ul>
          {currentMeal.ingredients.map(ing => (
            <li key={ing._id}>{ing.name}</li>
          ))}
        </ul>
      </div>
    );
  else return <div className="MealInfo">No meal selected</div>;
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
