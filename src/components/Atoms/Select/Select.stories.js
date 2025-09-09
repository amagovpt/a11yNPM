import React, { useState } from "react";
import Select from "./index";

export default {
  title: "components/Atoms/Select",
  component: Select,
};

const options = [
  { value: "", label: "Selecione uma opção" },
  { value: "1", label: "Opção 1" },
  { value: "2", label: "Opção 2" },
  { value: "3", label: "Opção 3" },
];

const Template = (args) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <Select
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Escolha uma opção",
  options,
  value: "",
  disabled: false,
  dark: "light",
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Desabilitado",
  options,
  value: "",
  disabled: true,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  label: "Tema Escuro", 
  options,
  value: "",
  darkTheme: "dark",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Campo com erro",
  options,
  value: "",
  error: "Este campo é obrigatório",
  id: "select-with-error",
};

export const Required = Template.bind({});
Required.args = {
  label: "Campo obrigatório",
  options,
  value: "",
  required: true,
  id: "required-select",
};

export const RequiredWithError = Template.bind({});
RequiredWithError.args = {
  label: "Campo obrigatório com erro",
  options,
  value: "",
  required: true,
  error: "Por favor, selecione uma opção",
  id: "required-select-error",
};

export const DarkThemeWithValidation = Template.bind({});
DarkThemeWithValidation.args = {
  label: "Tema escuro com validação",
  options,
  value: "",
  darkTheme: "dark",
  required: true,
  error: "Campo obrigatório no tema escuro",
  id: "dark-validation",
};