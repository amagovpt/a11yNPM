import React, { useState } from "react";
import MultiSelect from "./index";
import Documentation from "./Documentation.md";

export default {
  title: "components/Atoms/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
};

const sampleOptions = [
  { value: "", label: "Selecione uma opção" },
  { value: "1", label: "Opção 1" },
  { value: "2", label: "Opção 2" },
  { value: "3", label: "Opção 3" },
  { value: "4", label: "Opção 4" },
  { value: "5", label: "Opção 5" },
  { value: "6", label: "Opção 6" },
  { value: "7", label: "Opção 7" },
  { value: "8", label: "Opção 8" },
  { value: "9", label: "Opção 9" },
  { value: "10", label: "Opção 10" },
  { value: "11", label: "Opção 11" },
  { value: "12", label: "Opção 12" },
  { value: "13", label: "Opção 13" },
  { value: "14", label: "Opção 14" },
  { value: "15", label: "Opção 15" },
  { value: "16", label: "Opção 16" },
  { value: "17", label: "Opção 17" },
  { value: "18", label: "Opção 18" },
  { value: "19", label: "Opção 19" },
  { value: "20", label: "Opção 20" },
  { value: "21", label: "Opção 21" },
  { value: "22", label: "Opção 22" },
  { value: "23", label: "Opção 23" },
  { value: "24", label: "Opção 24" },
];

const Template = (args) => {
  const [value, setValue] = useState(args.value || []);
  return (
    <MultiSelect
      {...args}
      value={value}
      onChange={setValue}
      onInputChange={() => {}}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  label: "MultiSelect padrão",
  options: sampleOptions,
  value: ["1", "2"],
  disabled: false,
  theme: "light",
};

export const DarkTheme = Template.bind({});

DarkTheme.args = {
  label: "MultiSelect com tema escuro",
  options: sampleOptions,
  value: ["2"],
  theme: "dark",
};
