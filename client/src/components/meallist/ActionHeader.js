import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ActionHeader = ({ currentView }) => {
  return <div>{currentView}</div>;
};

ActionHeader.propTypes = {
  currentView: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  currentView: state.meal.currentView
});

export default connect(
  mapStateToProps,
  null
)(ActionHeader);
