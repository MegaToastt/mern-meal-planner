import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Header = ({ isAuthenticated, user, logout }) => {
  return (
    <header className="Header">
      <h1>MealManager</h1>
      {isAuthenticated ? (
        <div className="Header-userinfo">
          {user.username} (
          <Link onClick={logout} href="#!">
            Logout
          </Link>
          )
        </div>
      ) : (
        <div className="Header-userinfo">
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
