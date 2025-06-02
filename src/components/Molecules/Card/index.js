import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Icon } from '../../Atoms/Icon';
const Card = ({ title, subtitle, icon, darkTheme }) => {
    const theme = darkTheme ? "dark" : "";
    return (
        <div class={`card-ama ${theme}`}>
            <div class="card-icon-ama">
                <Icon name={icon} darkTheme={darkTheme} description={title} />
            </div>
            <div class={`card-content-ama ${theme}`}>
                <span class="card-title-ama">{subtitle}</span>
                <span class="card-subtitle-ama">{title}</span>
            </div>
        </div>
    );
};
Card.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};
export { Card };