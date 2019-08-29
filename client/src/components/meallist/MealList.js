import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentView, openSidebar } from "../../redux/actions/mealActions";
import { Redirect } from "react-router-dom";
import { loadMeals, loadIngredients } from "../../redux/actions/mealActions";
import MealListItem from "./MealListItem";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const MealList = ({
  meal,
  openSidebar,
  loadMeals,
  isAuthenticated,
  loadIngredients
}) => {
  useEffect(() => {
    loadMeals();
    loadIngredients();
  }, [loadMeals, loadIngredients]);

  return (
    <div className="MealList">
      <PerfectScrollbar>
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
        </ol>
      </PerfectScrollbar>
      {!meal.loading && (
        <div className="MealList-buttoncontainer">
          <button
            className="MealList-addmealbutton"
            onClick={() => openSidebar("Add")}
          >
            Add Meal
          </button>
        </div>
      )}
    </div>
  );
};

MealList.propTypes = {
  meal: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadMeals: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
  loadIngredients: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  meal: state.meal,
  isAuthenticated: state.auth.isAuthenticated,
  currentView: state.meal.currentView
});

export default connect(
  mapStateToProps,
  { loadMeals, loadIngredients, openSidebar }
)(MealList);
