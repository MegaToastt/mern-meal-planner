import React from "react";
import MealList from "./MealList";
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

const MealPlanner = ({ sidebarOpen, closeSidebar, clearSidebarView }) => {
  return (
    <div className="MealPlanner">
      <CSSTransition
        in={sidebarOpen}
        timeout={200}
        classNames="Sidebar-anim"
        // onEnter={() => setSidebarView(currentView)}
        onExited={clearSidebarView}
      >
        <Sidebar />
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
  sidebarOpen: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  sidebarOpen: state.meal.sidebarOpen
});

export default connect(
  mapStateToProps,
  { closeSidebar, clearSidebarView }
)(MealPlanner);
