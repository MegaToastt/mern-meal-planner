import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteMeal, setCurrentView } from "../../redux/actions/mealActions";

const MealInfoControls = ({ currentMeal, deleteMeal, setCurrentView }) => {
  const deleteClicked = () => {
    if (window.confirm("Are you sure you want to delete this meal?"))
      deleteMeal(currentMeal._id);
  };

  return (
    <div className="MealInfoControls">
      <button onClick={() => setCurrentView("Edit")} className="control-button">
        Edit
      </button>
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
  deleteMeal: PropTypes.func.isRequired,
  editCurrentItem: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  { deleteMeal, setCurrentView }
)(MealInfoControls);
