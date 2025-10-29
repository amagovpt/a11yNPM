import { Icon } from "../../Atoms/Icon";
import React from "react";
import { Accordion } from "../../Atoms/Accordion";

import "./styles.css";

const TableComponent = ({darkTheme, data, onClick, caption, col1, col2, col3, lvlTitle, headingLevel ="h2", imageTitlesCallback, ariaLabels}) => {
  const theme = darkTheme === "dark" ? "dark" : ""

  return (
    <>
      <table className={`table table_primary ama ${theme}`}>
        <caption className="visually-hidden">
          {caption}
        </caption>
        <thead>
          <tr>
            <th scope="col" colSpan="2">{col1}</th>
            <th scope="col" className="hide-on-small-screen">{col2}</th>
            <th scope="col" className="hide-on-small-screen">
              {col3}
            </th>
          </tr>
        </thead>

        <tbody>
          {data && data.map((option) => (
            <tr key={option.id} id={'tr_'+option.id}>
              <td className={option?.tdClassName}>
                <span className="visually-hidden">
                  {imageTitlesCallback(option.iconName)}
                </span>
                <Icon name={option.iconName} />
              </td>
              <td className="mobile-options">
                <Accordion options={[option]} flush={true} id={option.id} table={true} headingLevel={headingLevel} />

                <div className="hide_desktop-screen">
                  <span className="ms-3 lvl_color">
                    {lvlTitle + option?.lvl}
                  </span>

                  {option.ele && (
                    <button
                      onClick={() => onClick(option.ele && option.ele)}
                      className="detail_link"
                      aria-label={ariaLabels["button"]}
                      aria-describedby={option.id}
                    >
                      <Icon name="AMA-Detalhe-Line" />
                    </button>
                  )}
                </div>
              </td>
              <td className="middle_col hide-on-small-screen" aria-label={ariaLabels[option?.lvl]} >{option?.lvl}</td>

              <td
                className={`hide-on-small-screen ${option.ele ? "" : "visually-hidden"}`}
              >
                <button
                  onClick={() => onClick(option.ele && option.ele)}
                  className="detail_link"
                  aria-label={ariaLabels["button"]}
                  aria-describedby={option.id}
                >
                  <Icon name="AMA-Detalhe-Line" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export { TableComponent };
