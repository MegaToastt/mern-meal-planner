import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MealListEditForm from "./MealListEditForm";
import MealListAddForm from "./MealListAddForm";

const Sidebar = ({ sidebarView }) => {
  return (
    <div className="Sidebar">
      {sidebarView === "Add" && <MealListAddForm />}
      {sidebarView === "Edit" && <MealListEditForm />}
    </div>
  );
};

Sidebar.propTypes = {
  sidebarView: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  sidebarView: state.meal.sidebarView
});

export default connect(
  mapStateToProps,
  null
)(Sidebar);
