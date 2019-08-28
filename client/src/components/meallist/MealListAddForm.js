import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMeal, setCurrentView } from "../../redux/actions/mealActions";
import MealForm from "./MealForm";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const MealListAddForm = ({ isAuthenticated, addMeal, setCurrentView }) => {
  const handleSubmit = (e, meal) => {
    e.preventDefault();
    addMeal({
      ...meal
    });
  };

  return (
    <PerfectScrollbar style={{ flex: 1 }}>
      <div className="MealListAddForm form-container">
        {isAuthenticated && <Redirect to="/" />}
        <h2>Add Meal</h2>
        <MealForm handleSubmit={handleSubmit} />
        <button onClick={() => setCurrentView("Info")} className="danger">
          Cancel
        </button>
      </div>
    </PerfectScrollbar>
  );
};

MealListAddForm.propTypes = {
  addMeal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setCurrentView: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addMeal, setCurrentView }
)(MealListAddForm);
