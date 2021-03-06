import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Header = ({ isAuthenticated, user, logout }) => {
  return (
    <header className="Header">
      <div className="brand">
        <h1>MealPlot</h1>
      </div>
      {isAuthenticated ? (
        <div className="Header-userinfo">
          <span>Welcome, {user.username}</span>
          <div className="Header-userimg" onClick={logout}>
            <img src="#" alt="User" />
          </div>
        </div>
      ) : (
        <div className="Header-loggedout">
          <Link to="/login">Login </Link>
          or
          <Link to="/register"> Register</Link>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
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
)(Header);
