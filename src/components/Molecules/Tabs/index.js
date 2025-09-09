import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Tabs = ({ tabs, vertical, defaultActiveKey, onTabChange = () => {},  ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveKey || (tabs[0]?.eventKey || ""));

  const handleTabClick = (eventKey) => {
    setActiveTab(eventKey);
    onTabChange(eventKey);
  };

  const handleKeyDown = (event, eventKey) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleTabClick(eventKey);
    }
  };

  return (
    <div className={`tabs-container ama ${vertical ? "vertical-tabs" : ""}`} role="tablist">
      <div className={`nav-tabs ${vertical ? "vertical" : "horizontal"}`}>
        {tabs.map((tab, index) => (
          <button
            key={tab.eventKey}
            className={`nav-link ${activeTab === tab.eventKey ? "active" : ""}`}
            onClick={() => handleTabClick(tab.eventKey)}
            onKeyDown={(e) => handleKeyDown(e, tab.eventKey)}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.eventKey}
            aria-controls={`panel-${tab.eventKey}`}
            id={`tab-${tab.eventKey}`}
            disabled={tab.disabled}
            tabIndex={activeTab === tab.eventKey ? 0 : -1}
          >
            {tab.title}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.eventKey}
            id={`panel-${tab.eventKey}`}
            className={`tab-pane ${activeTab === tab.eventKey ? "active" : ""}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.eventKey}`}
            aria-hidden={activeTab !== tab.eventKey}
            style={{
              display: activeTab === tab.eventKey ? "block" : "none"
            }}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.defaultProps = {
  tabs: [],
  className: "mb-3",
  defaultActiveKey: "",
  vertical: false,
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    eventKey: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    component: PropTypes.node.isRequired,
    disabled: PropTypes.bool
  })),
  className: PropTypes.string,
  defaultActiveKey: PropTypes.string,
  vertical: PropTypes.bool,
};

export default Tabs;
export { Tabs };
