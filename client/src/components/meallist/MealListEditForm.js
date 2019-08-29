import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editMeal, closeSidebar } from "../../redux/actions/mealActions";
import MealForm from "./MealForm";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const MealListEditForm = ({
  isAuthenticated,
  editMeal,
  currentMeal,
  closeSidebar
}) => {
  const handleSubmit = (e, meal) => {
    e.preventDefault();
    editMeal({
      ...meal
    });
  };

  return (
    <PerfectScrollbar style={{ flex: 1 }}>
      <div className="MealListEditForm form-container">
        {isAuthenticated && <Redirect to="/" />}
        <h2>Edit Meal</h2>
        <MealForm handleSubmit={handleSubmit} currentMeal={currentMeal} />
        <button onClick={closeSidebar} className="danger">
          Cancel
        </button>
      </div>
    </PerfectScrollbar>
  );
};

MealListEditForm.propTypes = {
  editMeal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  currentMeal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  currentMeal: state.meal.currentMeal
});

export default connect(
  mapStateToProps,
  { editMeal, closeSidebar }
)(MealListEditForm);
