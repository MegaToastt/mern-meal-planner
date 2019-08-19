import React from "react";
import MealList from "./MealList";
import MealInfo from "./MealListInfo";
import MealListAddForm from "./MealListAddForm";
import PropTypes from "prop-types";

import { connect } from "react-redux";

const MealPlanner = ({ currentView }) => {
  return (
    <div className="MealPlanner">
      <MealList />
      {currentView === "Info" && <MealInfo />}
      {currentView === "Add" && <MealListAddForm />}
    </div>
  );
};

MealPlanner.propTypes = {
  currentView: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentView: state.meal.currentView
});

export default connect(
  mapStateToProps,
  null
)(MealPlanner);
