import React from "react";
import Card from "./index";

export default {
    title: "components/Molecules/Card",
    component: Card,
    tags: ["autodocs"],
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: "Diretórios",
    subtitle: "37",
    icon: "AMA-Pasta-Line", 
    darkTheme: false,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    title: "Arquivos",
    subtitle: "12",
    icon: "AMA-Paginas-Line", 
    darkTheme: true,
};