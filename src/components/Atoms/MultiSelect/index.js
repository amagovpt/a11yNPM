// MultiSelectBootstrap.js
import React, { useState, useMemo, useRef, useEffect } from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import CloseButton from "react-bootstrap/CloseButton";
import Form from "react-bootstrap/Form";
import "./styles.css";          // (mesmo CSS de antes, ajustado abaixo)

function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = "Pesquisar...",
  label,
  theme = "light",
  disabled = false,
  onInputChange,
  defaultValue = [],
  isValid = null,
  isInvalid = null,
  validFeedback = "",
  invalidFeedback = "",
  validateOnChange = true,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  /** -------- validation logic -------- */
  const isDifferentFromDefault = useMemo(() => {
    if (!validateOnChange) return false;
    
    // Convert arrays to sorted strings for comparison
    const currentSorted = [...value].sort().join(',');
    const defaultSorted = [...defaultValue].sort().join(',');
    
    return currentSorted !== defaultSorted;
  }, [value, defaultValue, validateOnChange]);

  // Determine validation state
  const validationState = useMemo(() => {
    if (isValid !== null) return isValid;
    if (isInvalid !== null) return !isInvalid;
    if (validateOnChange) return isDifferentFromDefault;
    return null;
  }, [isValid, isInvalid, isDifferentFromDefault, validateOnChange]);

  /** -------- lógica -------- */
  const filtered = useMemo(
    () =>
      options.filter(
        (opt) =>
          !value.includes(opt.value) &&
          opt.label.toLowerCase().includes(search.toLowerCase())
      ),
    [search, options, value]
  );

  const pick = (val) => {
    if (!value.includes(val)) {
      onChange([...value, val]);
      setSearch("");
      setOpen(true);
    }
  };

  const remove = (val) => onChange(value.filter((v) => v !== val));

  /** -------- fecha menu ao clicar fora -------- */
  useEffect(() => {
    const h = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={containerRef} className="position-relative w-100">
      {label && <label className={`multi-select-label ${theme}`}>{label}</label>}

      {/* Campo de entrada + badges (InputGroup p/ manter estilo Bootstrap) */}
      <InputGroup
        className={`multi-select-input ${theme} ${disabled ? "disabled" : ""} ${
          validationState === true ? "is-valid" : ""
        } ${validationState === false ? "is-invalid" : ""}`}
        onClick={() => {
          !disabled && inputRef.current?.focus();
          setOpen(true);
        }}
      >
        {/* Badges já selecionados */}
        <div className="d-flex flex-wrap align-items-center gap-1 ps-2">
          {value.map((v) => {
            const o = options.find((o) => o.value === v);
            if (!o) return null;
            return (
              <Badge pill bg="light" text="dark" key={v} className="d-flex bdage-label">
                {o.label}
                <CloseButton
                  className="ms-1"
                  aria-label={`Remover ${o.label}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(v);
                  }}
                />
              </Badge>
            );
          })}
        </div>

        {/* FormControl de pesquisa */}
        <FormControl
          ref={inputRef}
          className={`border-0 flex-grow-1 multi-search-input ${theme}`}
          placeholder={placeholder}
          value={search}
          disabled={disabled}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
            onInputChange(e.target.value);
          }}
          onFocus={() => !disabled && setOpen(true)}
        />
      </InputGroup>

      {/* Form validation feedback */}
      {validationState === true && validFeedback && (
        <Form.Control.Feedback type="valid" className="d-block">
          {validFeedback}
        </Form.Control.Feedback>
      )}
      {validationState === false && invalidFeedback && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {invalidFeedback}
        </Form.Control.Feedback>
      )}
      {validationState === false && !invalidFeedback && validateOnChange && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {isDifferentFromDefault 
            ? "" 
            : "Selecione pelo menos uma opção"}
        </Form.Control.Feedback>
      )}

      {/* ListGroup como dropdown */}
      {open && filtered.length > 0 && !disabled && (
        <ListGroup className={`multi-select-menu ${theme}`}>
          {filtered.map((opt) => (
            <ListGroup.Item
              action
              key={opt.value}
              onClick={() => pick(opt.value)}
              onKeyDown={(e) => e.key === "Enter" && pick(opt.value)}
              role="option"
              tabIndex={0}
            >
              {opt.label}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default MultiSelect;
export { MultiSelect };
