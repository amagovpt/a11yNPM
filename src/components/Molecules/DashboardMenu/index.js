import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Icon } from '../../Atoms/Icon';
const DashboardMenu = ({ menuItems, onMenuItemClick, activeItem, darkTheme }) => {

    const theme = darkTheme ? "dark" : "";
    return (
        <div className={"dashboard-menu" + " " + theme}>
            <span className={"menu-info" + " " + theme}>Menu</span>
            <ul className={"menu-list" + " " + theme}>
                {menuItems.map((item, index) => (
                        <li
                            key={index}
                            role="menuitem"
                            onClick={() => onMenuItemClick(item.id)}
                            tabIndex={0}
                            aria-current={activeItem === item.id ? "page" : undefined}
                            className={`menu-item ${theme} ${activeItem === item.id ? "active" : ""}`}
                        >
                            <Icon name={item.icon} darkTheme={darkTheme} />
                            <span className="menu-label text-center">{item.label}</span>
                        </li>
                ))}
            </ul>
        </div>
    );
};

DashboardMenu.propTypes = {
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
        })
    ).isRequired,
    onMenuItemClick: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
};

export { DashboardMenu };