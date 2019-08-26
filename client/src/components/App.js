import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import setAuthToken from "../utils/setAuthToken";
import { loadUser } from "../redux/actions/authActions";

import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import MealPlanner from "./meallist/MealPlanner";
import Login from "./auth/Login";
import Register from "./auth/Register";

if (localStorage.token) setAuthToken(localStorage.token);

const App = ({ isAuthenticated, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="App">
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={MealPlanner} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadUser }
)(App);
