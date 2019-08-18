import React, { useState } from "react";
import PropTypes from "prop-types";
import { setCurrentMeal } from "../../redux/actions/mealActions";
import { connect } from "react-redux";

const MealListItem = ({ text, id, setCurrentMeal, selected }) => {
  // const [id, setId] = useState(id);

  let classes = "MealList-meal";
  if (selected) classes += " MealList-meal-selected";

  return (
    <li className={classes} onClick={() => setCurrentMeal(id)}>
      {text}
    </li>
  );
};

MealListItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setCurrentMeal: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

export default connect(
  null,
  { setCurrentMeal }
)(MealListItem);
