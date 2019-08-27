import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alertbox = ({ alerts }) => {
  return (
    <div className="Alertbox">
      <ul>
        {alerts.map((alert, index) => (
          <li key={index} className={"alert-" + alert.style}>
            {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

Alertbox.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(
  mapStateToProps,
  null
)(Alertbox);
