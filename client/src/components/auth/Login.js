import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/authActions";
import Alertbox from "../Alertbox";
import HeaderLoggedout from "../HeaderLoggedout";
import { clearAlerts } from "../../redux/actions/alertActions";
import FloatingLabelInput from "../meallist/FloatingLabelInput";

import { Redirect } from "react-router-dom";

const Login = ({ login, isAuthenticated, clearAlerts }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    clearAlerts();
  }, [clearAlerts]);

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Fragment>
      <HeaderLoggedout />
      <div className="container-med">
        <Alertbox />
        <div className="form-auth-container">
          {isAuthenticated && <Redirect to="/" />}
          <h2>Login</h2>
          <form className="form" onSubmit={handleSubmit}>
            <FloatingLabelInput
              name="email"
              title="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <FloatingLabelInput
              title="Password"
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  clearAlerts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {
    login,
    clearAlerts
  }
)(Login);
