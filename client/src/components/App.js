import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import setAuthToken from "../utils/setAuthToken";
import { loadUser } from "../redux/actions/authActions";

import Header from "./Header";
import MealList from "./MealList";
import Login from "./auth/Login";
import Register from "./auth/Register";

if (localStorage.token) setAuthToken(localStorage.token);

const App = ({ isAuthenticated, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      <Header />
      {isAuthenticated ? <MealList /> : <Login />}
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
