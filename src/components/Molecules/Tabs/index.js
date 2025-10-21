import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Tabs = ({ tabs, vertical, defaultActiveKey, onTabChange = () => {}, title, ...props }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveKey || (tabs[0]?.eventKey || ""));
  const tablistId = `tablist-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `title-${Math.random().toString(36).substr(2, 9)}`;
  const panelId = `panel-${Math.random().toString(36).substr(2, 9)}`;
  const tabId = `panel-${Math.random().toString(36).substr(2, 9)}`;

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
    <div>
      {title && (
        <h2 id={"title_tab_list"} className="tabs-title bold">
          {title}
        </h2>
      )}

    <div className={`tabs-container ama ${vertical ? "vertical-tabs" : ""}`}>

      <div 
        className={`nav-tabs ${vertical ? "vertical" : "horizontal"}`}
        role="tablist"
        aria-labelledby={"title_tab_list"}
        id={tablistId}
        >
        {tabs.map((tab, index) => (
          <button
          key={tab.eventKey}
          className={`nav-link ${activeTab === tab.eventKey ? "active" : ""}`}
          onClick={() => handleTabClick(tab.eventKey)}
          onKeyDown={(e) => handleKeyDown(e, tab.eventKey)}
          role="tab"
          type="button"
            aria-selected={activeTab === tab.eventKey}
            aria-controls={panelId}
            id={`${tabId}-${index}`}
            disabled={tab.disabled}
            tabIndex={activeTab === tab.eventKey ? 0 : -1}
            >
            {tab.title}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {tabs.map((tab, index) => ( 
          <div
          key={tab.eventKey}
          id={`${panelId}-${index}`}
          className={`tab-pane ${activeTab === tab.eventKey ? "active" : "is-hidden"}`}
          role="tabpanel"
          tabIndex="0"
          aria-labelledby={`${tabId}-${index}`}
          style={{
            display: activeTab === tab.eventKey ? "block" : "none"
          }}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
</div>
  );
};

Tabs.defaultProps = {
  tabs: [],
  className: "mb-3",
  defaultActiveKey: "",
  vertical: false,
  title: null,
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
  title: PropTypes.string,
  onTabChange: PropTypes.func,
};

export default Tabs;
export { Tabs };
