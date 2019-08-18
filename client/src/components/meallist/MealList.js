import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentMeal } from "../../redux/actions/mealActions";
import { Redirect } from "react-router-dom";
import { loadMeals } from "../../redux/actions/mealActions";
import MealListItem from "./MealListItem";

const MealList = ({ meal, setCurrentMeal, loadMeals, isAuthenticated }) => {
  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  return (
    <div className="MealList">
      {!isAuthenticated && <Redirect to="/login" />}
      <ol>
        {meal.meals.map(m => {
          return (
            <MealListItem
              id={m._id}
              text={m.name}
              key={m._id}
              selected={meal.currentMeal && m._id === meal.currentMeal._id}
            />
          );
        })}
      </ol>
    </div>
  );
};

MealList.propTypes = {
  meal: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setCurrentMeal: PropTypes.func.isRequired,
  loadMeals: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setCurrentMeal, loadMeals }
)(MealList);
