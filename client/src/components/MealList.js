import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentMeal } from "../redux/actions/mealActions";

const MealList = ({ meals, setCurrentItem }) => {
  const onMealClick = id => {
    let newmeal = null;
    for (let section in meals.sections) {
      console.log(section.name);
    }
  };

  return (
    <div className="MealList">
      {meals.sections.map(section => {
        return (
          <div key={section.id} className="MealList-section">
            <h3>{section.name}</h3>
            <ol>
              {section.meals.map(meal => {
                return (
                  <li
                    onClick={() => onMealClick(meal.id)}
                    key={meal.id}
                    className="MealList-meal"
                  >
                    {meal.name}
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
};

MealList.propTypes = {};

const mapStateToProps = state => ({
  meals: state.meals
});

export default connect(
  mapStateToProps,
  { setCurrentMeal }
)(MealList);
