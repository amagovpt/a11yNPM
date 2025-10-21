import React from "react";
import { Tabs } from "./index";
import Documentation from './Documentation.md'

export default {
  title: "components/Molecules/Tabs",
  component: Tabs,
  argTypes: {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
};

const tabs = [
  {
    eventKey: "tab1",
    title: "Insert URL",
    component: <div>tab 1</div>,
  },
  {
    eventKey: "tab2",
    title: "Insert HTML code",
    component: <div>tab 2</div>,
  },
  {
    eventKey: "tab3",
    title: "Upload HTML file",
    component: <div>tab 3</div>,
    // disabled: true,
  },
];

const tabs2 = [
  {
    eventKey: "tab1",
    title: "Insert URL",
    component: <div className="tabs_info_container">tab 1</div>,
  },
  {
    eventKey: "tab2",
    title: "Insert HTML code",
    component: <div className="tabs_info_container">tab 2</div>,
  },
  {
    eventKey: "tab3",
    title: "Upload HTML file",
    component: <div className="tabs_info_container">tab 3</div>,
    // disabled: true,
  },
];

export const TabHozrizontal = (args) => {
  return <Tabs {...args} title="Tab Horizontal" tabs={tabs} defaultActiveKey={"tab1"} vertical={false} />;
};


export const TabVertical = (args) => {
  return <Tabs {...args} title="Tab Vertical" tabs={tabs2} defaultActiveKey={"tab1"} vertical={true} />;
};
