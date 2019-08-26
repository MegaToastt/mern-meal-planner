import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentView } from "../../redux/actions/mealActions";
import { Redirect } from "react-router-dom";
import { loadMeals } from "../../redux/actions/mealActions";
import MealListItem from "./MealListItem";
import Scrollbar from "react-scrollbars-custom";

const MealList = ({
  meal,
  setCurrentView,
  currentView,
  loadMeals,
  isAuthenticated
}) => {
  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  return (
    <div className="MealList">
      {!isAuthenticated && <Redirect to="/login" />}
      <Scrollbar>
        <ol>
          {meal.loading ? (
            <li className="MealList-meal">Loading...</li>
          ) : (
            meal.meals.map(m => {
              return (
                <MealListItem
                  id={m._id}
                  text={m.name}
                  key={m._id}
                  selected={meal.currentMeal && m._id === meal.currentMeal._id}
                />
              );
            })
          )}
          {!meal.loading && (
            <li
              onClick={() => setCurrentView("Add")}
              className={
                "MealList-meal MealList-add" +
                (currentView === "Add" ? " MealList-add-selected" : "")
              }
            >
              Add Meal
            </li>
          )}
        </ol>
      </Scrollbar>
    </div>
  );
};

MealList.propTypes = {
  meal: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  loadMeals: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal,
  isAuthenticated: state.auth.isAuthenticated,
  currentView: state.meal.currentView
});

export default connect(
  mapStateToProps,
  { setCurrentView, loadMeals }
)(MealList);
