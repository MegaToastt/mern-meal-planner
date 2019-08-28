import React, { useEffect, useState } from "react";
import MealList from "./MealList";
import MealInfo from "./MealListInfo";
import PropTypes from "prop-types";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { CSSTransition } from "react-transition-group";

import { connect } from "react-redux";

const MealPlanner = ({ currentView }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarView, setSidebarView] = useState("");

  useEffect(() => {
    if (currentView !== "Info") setSidebarOpen(true);
    else setSidebarOpen(false);
  }, [currentView]);

  return (
    <div className="MealPlanner">
      <CSSTransition
        in={sidebarOpen}
        timeout={200}
        classNames="Sidebar-anim"
        onEnter={() => setSidebarView(currentView)}
      >
        <Sidebar currentDisplayed={sidebarView} />
      </CSSTransition>
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
