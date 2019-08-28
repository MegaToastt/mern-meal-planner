import React from "react";
import MealList from "./MealList";
import MealInfo from "./MealListInfo";
import PropTypes from "prop-types";
import Header from "../Header";
import Sidebar from "./Sidebar";

import { connect } from "react-redux";

const MealPlanner = ({ currentView }) => {
  return (
    <div className="MealPlanner">
      <Sidebar />
      <MealList />
      <div className="main-body">
        <Header />
        <MealInfo />
      </div>
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
