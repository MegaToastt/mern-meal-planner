import React from "react";
import MealList from "./MealList";
import MealInfo from "./MealListInfo";
import MealListAddForm from "./MealListAddForm";
import MealListEditForm from "./MealListEditForm";
import PropTypes from "prop-types";

import { connect } from "react-redux";

const MealPlanner = ({ currentView }) => {
  return (
    <div className="MealPlanner">
      <MealList />
      {currentView === "Info" && <MealInfo />}
      {currentView === "Add" && <MealListAddForm />}
      {currentView === "Edit" && <MealListEditForm />}
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
