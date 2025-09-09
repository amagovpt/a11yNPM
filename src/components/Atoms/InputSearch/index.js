import React from "react";
import PropTypes from "prop-types";
import { InputGroup, Form, Button } from "react-bootstrap";

import { Icon } from "../Icon";

import "./styles.css";

// const inputSearchSize = {
//   SM: "sm",
//   LG: "lg",
// };

const InputSearch = ({
  darkTheme,
  placeholder,
  value,
  defaultValue,
  onChange,
  onSearch,
  ...props
}) => {
  const [val, setVal] = React.useState(value || defaultValue);

  const handleOnSearch = () => {
    onSearch(val);
  };

  const handleOnChange = (event) => {
    setVal(event.target.value);
    onChange(event);
  };

  const handleOnKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      handleOnSearch();
    }
  };

  const theme = darkTheme === "dark" ? "dark" : ""

  return (
    <InputGroup className={`ama field-search ${theme}`} {...props}>
      <Form.Control
        placeholder={placeholder}
        type="search"
        value={val}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      <Button 
        variant="outline-secondary" 
        onClick={handleOnSearch}
        aria-label="Pesquisar"
      >
        <Icon name="AMA-Pesquisa3-Line" />
      </Button>
    </InputGroup>
  );
};

InputSearch.defaultProps = {
  placeholder: "Search...",
  // size: undefined,
  value: "",
  defaultValue: "",
  onChange: () => {},
  onSearch: () => {},
};

InputSearch.propTypes = {
  placeholder: PropTypes.string,
  // size: PropTypes.oneOf(Object.values(inputSearchSize)),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

export default InputSearch;
export { InputSearch };
