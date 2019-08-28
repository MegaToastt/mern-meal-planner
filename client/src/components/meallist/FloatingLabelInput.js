import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const FloatingLabelInput = ({ name, title, type, onChange, value }) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused && (value !== "" && value !== null)) setFocused(true);
  }, [focused, value]);

  return (
    <div className="FloatingLabelInput">
      <label className={focused ? "focused" : ""} htmlFor={name}>
        {title}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          if (value === "" || value === null) setFocused(false);
        }}
      />
    </div>
  );
};

FloatingLabelInput.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

FloatingLabelInput.propDefaults = {
  type: "text"
};

export default FloatingLabelInput;
