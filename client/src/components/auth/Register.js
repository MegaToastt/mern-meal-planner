import React, { useState, Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../redux/actions/authActions";
import Alertbox from "../Alertbox";
import { clearAlerts } from "../../redux/actions/alertActions";
import FloatingLabelInput from "../meallist/FloatingLabelInput";

import { Redirect } from "react-router-dom";
import Header from "../Header";

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
      <Header />
      <div className="flex-center-container">
        <Alertbox />
        <div className="form-auth-container">
          {isAuthenticated && <Redirect to="/" />}
          <h2>Register</h2>
          <form className="form" onSubmit={handleSubmit}>
            <FloatingLabelInput
              title="Username"
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <FloatingLabelInput
              title="Email"
              type="email"
              name="email"
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
