import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../redux/actions/authActions";
import Alertbox from "../Alertbox";
import HeaderLoggedout from "../HeaderLoggedout";
import { clearAlerts } from "../../redux/actions/alertActions";

import { Redirect } from "react-router-dom";

const Register = ({ register, isAuthenticated, clearAlerts }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  const handleSubmit = e => {
    e.preventDefault();
    register({ username, email, password });
  };

  return (
    <Fragment>
      <HeaderLoggedout />
      <div className="container-med">
        <Alertbox />
        <div className="form-auth-container">
          {isAuthenticated && <Redirect to="/" />}
          <h2>Register</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  clearAlerts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    register,
    clearAlerts
  }
)(Register);
