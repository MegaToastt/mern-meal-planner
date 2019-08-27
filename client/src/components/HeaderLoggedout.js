import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const HeaderLoggedout = ({ isAuthenticated, user, logout }) => {
  return (
    <header className="Header">
      <div className="Header-loggedout">
        <Link to="/login">Login </Link>
        or
        <Link to="/register"> Register</Link>
      </div>
      <div className="brand">
        <h1>MealManager</h1>
      </div>
    </header>
  );
};

HeaderLoggedout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logout }
)(HeaderLoggedout);
