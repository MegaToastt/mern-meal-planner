import React from "react";
import { Redirect } from "react-router-dom";
import MealInfo from "./MealListInfo";
import PropTypes from "prop-types";
import Header from "../Header";
import Sidebar from "./Sidebar";
import { CSSTransition } from "react-transition-group";
import {
  closeSidebar,
  clearSidebarView
} from "../../redux/actions/mealActions";

import { connect } from "react-redux";
import { AUTH_ERROR } from "../../redux/actions/actionTypes";

const MealPlanner = ({
  sidebarOpen,
  closeSidebar,
  clearSidebarView,
  isAuthenticated
}) => {
  return (
    <div className="MealPlanner">
      {!isAuthenticated && <Redirect to="/login" />}
      <CSSTransition
        in={sidebarOpen}
        timeout={200}
        classNames="Sidebar-anim"
        // onEnter={() => setSidebarView(currentView)}
        onExited={clearSidebarView}
      >
        <Sidebar />
      </CSSTransition>
      <div className="main-body">
        <Header />
        <MealInfo />
      </div>
    </div>
  );
};

MealPlanner.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  sidebarOpen: state.meal.sidebarOpen,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { closeSidebar, clearSidebarView }
)(MealPlanner);
