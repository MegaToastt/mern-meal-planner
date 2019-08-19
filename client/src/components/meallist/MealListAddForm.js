import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMeal } from "../../redux/actions/mealActions";

const MealListAddForm = ({ isAuthenticated, addMeal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    addMeal({ name, description });
  };

  return (
    <div className="MealListAddForm form-container">
      {isAuthenticated && <Redirect to="/" />}
      <h2>Add Meal</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

MealListAddForm.propTypes = {
  addMeal: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addMeal }
)(MealListAddForm);
