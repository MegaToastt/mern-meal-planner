import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/authActions";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="Register form" onSubmit={handleSubmit}>
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
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    login
  }
)(Login);
