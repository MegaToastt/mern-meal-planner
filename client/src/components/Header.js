import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Header = ({ isAuthenticated, user }) => {
  return (
    <header className="Header">
      <h1>MealManager</h1>
      {isAuthenticated ? (
        <div className="Header-userinfo">Welcome, {user.username}</div>
      ) : (
        <div className="Header-userinfo">Not logged in</div>
      )}
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(Header);
