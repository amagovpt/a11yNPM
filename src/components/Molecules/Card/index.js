import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Icon } from '../../Atoms/Icon';
const Card = ({ itemsList, darkTheme }) => {
    const theme = darkTheme ? "dark" : "";
    return (
        <ul class="card-ama-list">
            {
            itemsList.map((item) => (
                <li class={`card-ama ${theme}`}>
                    <span class="card-icon-ama">
                        <Icon name={item.icon} darkTheme={darkTheme} description={item.title} />
                    </span>
                    <span class={`card-content-ama ${theme}`}>
                        <span class="card-title-ama">{item.subtitle} </span>
                        <span class="card-subtitle-ama">{item.title}</span>
                    </span>
                </li>
            ))
            }
        </ul>
    );
};
Card.propTypes = {
    itemsList: PropTypes.array.isRequired,
    darkTheme: PropTypes.bool.isRequired,
};
export { Card };