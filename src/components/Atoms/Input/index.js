import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from '../Button'
import {Icon} from '../Icon'

import "./styles.css";

import classNames from "classnames";

const Input = ({ darkTheme, upload, label, type, placeholder, error, id, showPassTextAria, hidePassTextAria, ...rest }) => {

  const [showPass, setShowPass] = useState(false)

  const inputClass = classNames("form-control", {
    "is-invalid": error,
  });
  const classUpload = upload ? "fieldUpload" : "field"
  const theme = darkTheme === "dark" ? "dark" : ""
  return (
    <Form.Group className={`ama ${classUpload} ${theme}`}>
      {type === 'password' ?
        <div className="d-flex justify-content-between">
          <Form.Label htmlFor={id}>{label}</Form.Label>
          <Button
            darkTheme={theme}
            className={"align-self-center show_pass"}
            variant={"secondary"}
            text={""}
            
            aria-label={!showPass ? showPassTextAria : hidePassTextAria}
            iconRight={<Icon darkTheme={theme} name={!showPass ? "AMA-Invisible-Solid" : "AMA-Visible-Line"} />} 
            onClick={() => setShowPass(!showPass)}
          />
        </div>
      : <Form.Label htmlFor={id}>{label}</Form.Label>}
      <Form.Control
        type={showPass ? "text" : type}
        placeholder={placeholder}
        className={inputClass}
        id={id}
        {...rest}
      />

      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export { Input };
