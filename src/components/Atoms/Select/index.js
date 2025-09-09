import React from "react";
import PropTypes from "prop-types";
import { FormSelect, Form } from "react-bootstrap";
import classNames from "classnames";
import "./styles.css";

let Select = ({ options, value, onChange, label, disabled, darkTheme, error, required, id, ...props }) =>{
  const theme = darkTheme === "dark" ? "dark" : ""
  
  const selectClass = classNames(`ama-select-input ${theme}`, {
    "is-invalid": error,
  });
  
  return (
  <div className={`ama-select-atom ${theme}`}>
    {label && (
      <label className={`ama-select-label ${theme}`} htmlFor={id}>
        {label}
        {required && <span className="required-indicator"> *</span>}
      </label>
    )}
    <FormSelect
      className={selectClass} 
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      id={id}
      required={required}
      {...props}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </FormSelect>
    {error && (
      <Form.Control.Feedback type="invalid" className="select-error-feedback">
        {error}
      </Form.Control.Feedback>
    )}
  </div>

);
}
Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  darkTheme: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
};
Select = React.memo(Select);

export default Select;
export { Select };