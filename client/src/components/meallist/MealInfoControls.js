import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteMeal } from "../../redux/actions/mealActions";

const MealInfoControls = ({ currentMeal, deleteMeal }) => {
  const deleteClicked = () => {
    if (window.confirm("Are you sure you want to delete this meal?"))
      deleteMeal(currentMeal._id);
  };

  return (
    <div className="MealInfoControls">
      <button onClick={deleteClicked} className="control-button control-danger">
        Delete
      </button>
    </div>
  );
};

MealInfoControls.propTypes = {
  currentMeal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentMeal: state.meal.currentMeal,
  deleteMeal: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  { deleteMeal }
)(MealInfoControls);
