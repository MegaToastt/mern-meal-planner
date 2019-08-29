import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteMeal,
  setCurrentView,
  openSidebar
} from "../../redux/actions/mealActions";

const MealInfoControls = ({ currentMeal, deleteMeal, openSidebar }) => {
  const deleteClicked = () => {
    if (window.confirm("Are you sure you want to delete this meal?"))
      deleteMeal(currentMeal._id);
  };

  return (
    <div className="MealInfoControls">
      <button onClick={() => openSidebar("Edit")}>Edit</button>
      <button onClick={deleteClicked}>Delete</button>
    </div>
  );
};

MealInfoControls.propTypes = {
  currentMeal: PropTypes.object.isRequired,
  deleteMeal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentMeal: state.meal.currentMeal
});

export default connect(
  mapStateToProps,
  { deleteMeal, setCurrentView, openSidebar }
)(MealInfoControls);
