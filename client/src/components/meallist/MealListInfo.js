import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const MealListInfo = ({ currentMeal }) => {
  if (currentMeal)
    return (
      <div className="MealInfo">
        <h2>{currentMeal.name}</h2>
        <p>{currentMeal.description}</p>
        <p>{currentMeal.user}</p>
        <p>Ingredients:</p>
        <ul>
          {currentMeal.ingredients.map(ing => (
            <li>>{ing.name}</li>
          ))}
        </ul>
      </div>
    );
  else return <div className="MealInfo">No meal selected</div>;
};

MealListInfo.propTypes = {
  currentMeal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentMeal: state.meal.currentMeal
});

export default connect(
  mapStateToProps,
  null
)(MealListInfo);
