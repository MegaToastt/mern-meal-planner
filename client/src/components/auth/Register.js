import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../redux/actions/authActions";

const Register = ({ register }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    register({ username, email, password });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form className="Register form" onSubmit={handleSubmit}>
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
  );
};

Register.propTypes = {};

export default connect(
  null,
  {
    register
  }
)(Register);
