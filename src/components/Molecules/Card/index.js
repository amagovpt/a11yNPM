import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Icon } from '../../Atoms/Icon';
const Card = ({ title, subtitle, icon, darkTheme }) => {
    const theme = darkTheme ? "dark" : "";
    return (
        <div class={`card ${theme}`}>
            <div class="card-icon">
               <Icon name={icon} darkTheme={darkTheme} description={title} />
            </div>
            <div class={`card-content ${theme}`}>
                <span class="card-title">{subtitle}</span>
                <span class="card-subtitle">{title}</span>
            </div>
        </div>
    );
};
Card.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};
export default Card;