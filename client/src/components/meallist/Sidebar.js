import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MealListEditForm from "./MealListEditForm";
import MealListAddForm from "./MealListAddForm";

const Sidebar = ({ currentView, currentDisplayed }) => {
  return (
    <div className="Sidebar">
      {currentDisplayed === "Add" && <MealListAddForm />}
      {currentDisplayed === "Edit" && <MealListEditForm />}
    </div>
  );
};

Sidebar.propTypes = {
  currentView: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentView: state.meal.currentView
});

export default connect(
  mapStateToProps,
  null
)(Sidebar);
