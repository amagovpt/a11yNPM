import React from "react";
import PropTypes from "prop-types";
import { Button as ButtonComponent, Spinner } from "react-bootstrap";

import "./styles.css";

const buttonVariant = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  CANCEL: "cancel",
  GHOST: "ghost",
  SUCCESS: "success",
  DANGER: "danger",
};

const buttonSize = {
  LG: "lg",
  MD: "md",
  SM: "sm",
};

const Button = ({
  darkTheme,
  loading,
  loadingText,
  text,
  children,
  radius,
  type,
  SpinnerProps,
  iconLeft,
  iconRight,
  className,
  ...props
}) => {
  const isLoading = loading && loadingText;
  const theme = darkTheme === "dark" ? "dark" : ""
  return (
    <ButtonComponent
      {...props}
      type={type}
      className={`${theme} ${className} ${
        radius === "full"
          ? "rounded-pill"
          : radius === "md"
            ? "rounded"
            : radius === "none"
              ? "rounded-0"
              : "rounded-0"
      } ${props.variant} ama`}
    >
      {!isLoading && iconLeft && <>{iconLeft}</>}

      {isLoading ? (
        <span className="btn-loading-container">
          <Spinner {...SpinnerProps} />
          <span className="btn-loading-text">{loadingText}</span>
        </span>
      ) : (
        <span className="ama-typography-body bold">{text}</span>
      )}

      {!isLoading && iconRight && <>{iconRight}</>}
    </ButtonComponent>
  );
};

Button.defaultProps = {
  children: "",
  variant: "primary",
  text: "Click here",
  size: "md",
  active: false,
  disabled: false,
  onClick: undefined,
  loading: false,
  type: "button",
  loadingText: "Loading",
  SpinnerProps: {
    size: "sm",
    animation: "border",
  },
  radius: "full",
  iconLeft: null,
  iconRight: null,
  className: "",
};

Button.propTypes = {
  children: PropTypes.any,
  variant: PropTypes.oneOf(Object.values(buttonVariant)),
  text: PropTypes.string,
  active: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(buttonSize)),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  SpinnerProps: PropTypes.instanceOf(Object),
  radius: PropTypes.oneOf(["full", "md", "none"]),
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  className: PropTypes.string,
  type: PropTypes.string
};

export default Button;
export { Button, buttonVariant, buttonSize };
