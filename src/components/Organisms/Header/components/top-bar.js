import "./top-bar.css";
import React from "react";
import { Icon } from "../../../Atoms/Icon";
import { Link } from "../../../Atoms/Link";
import { useRef, useState } from "react";

export function TopBar({darkTheme, changeTheme, changeLanguage, lngTexts}) {
  const [openAccordion, setOpenAccordion] = useState(false);
  const accordionContentRef = useRef(null);

  const toggleAccordion = () => {
    setOpenAccordion(!openAccordion);
    if (!openAccordion && accordionContentRef.current) {
      accordionContentRef.current.focus();
    }
  };

  const getTitle = () => {
    return openAccordion ? lngTexts.close_dropdown : lngTexts.open_dropdown;
  }

  return (
    <>
      <div className="top-bar">
        <div className="accordion accordion-flush" id="accordionTopBar">
            <div className="container d-flex justify-content-between flex-row-reverse top-bar-item py-1">
              <div className="d-flex flex-row gap-4 ">
                <button
                  className="btn btn-link dark-mode p-1 d-flex align-items-center"
                  id="darkModeBtn"
                  onClick={changeTheme ? () => changeTheme() : null}
                >
                  <span id="darkModeLabel" className="ama-typography-body">{lngTexts.dark_mode}</span>
                  <Icon
                    name="AMA-EscuroClaro-Line icon-dark"
                    aria-hidden="true"
                    darkTheme={darkTheme}
                  />
                </button>

                <button
                  className="btn btn-link language-mode p-1 d-flex align-items-center"
                  id="langModeBtn"
                  onClick={changeLanguage ? () => changeLanguage() : null}
                  lang={lngTexts.language}
                >
                  <span id="langModeLabel" className="ama-typography-body">{lngTexts.language_en}</span>
                  <Icon name="AMA-Globo-Line icon-lang" aria-hidden="true" darkTheme={darkTheme} />
                </button>
              </div>

              <div id="flushHeading">
                <button
                  type="button"
                  className="btn btn-link btn-ecossistema collapsed d-flex align-items-center p-1"
                  data-bs-toggle="collapse"
                  data-bs-target="#flushEcossistema"
                  aria-controls="flushEcossistema"
                  onClick={toggleAccordion}
                  aria-expanded={openAccordion ? "true" : "false"}
                  id="accordionBtn"
                  title={getTitle()}
                >
                  <span
                    className="icon-AMA-MenuCimaGrande-Line icon-ed-menu-dots dark_mode_span"
                    aria-hidden="true"
                  />

                  <span className="ama-typography-body">
                    {lngTexts.tool}
                    <span className="text-primary fw-bold dark_mode_span ama-typography-body bold">
                      acessibilidade.gov.pt
                    </span>
                  </span>

                  <span
                    className={` icon ${
                      openAccordion
                        ? "icon-AMA-SetaCima3-Line"
                        : "icon-AMA-SetaBaixo3-Line "
                    }`}
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </div>
          <div className="container">

            <div
              data-bs-parent="#accordionTopBar"
              id="flushEcossistema"
              className={`accordion-collapse collapse ${openAccordion ? "show" : ""}`}
              aria-labelledby="flushHeading"
              role="region"
              aria-roledescription={lngTexts.roleDescription}
            >
              <div className="accordion-body ps-0 pe-0">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6 align-self-center">
                      <div className="d-flex justify-content-between">
                        <div className="title-ecosssistema-ama">
                          <h2>
                            ecossistema
                            <br />
                            <strong>acessibilidade</strong>.gov.pt
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 align-self-center">
                      <div className="ama-typography-body">
                        <p className="m-0">
                          {lngTexts.text}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-4 mb-5" aria-hidden="true" />
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <div className="left-column-ecossistema-ama">
                        <h3 className="mb-2">
                          <strong>acessibilidade</strong>.gov.pt
                        </h3>
                      </div>
                      <p className="mb-4">
                        {lngTexts.accessibilityText}
                      </p>
                      <ul className="ama-list">
                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://observatorio.acessibilidade.gov.pt/"
                            text={lngTexts.accessibilityLink1}
                            darkTheme={darkTheme}
                          />
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://www.acessibilidade.gov.pt/gerador/"
                            text={lngTexts.accessibilityLink2}
                            darkTheme={darkTheme}
                          />
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://accessmonitor.acessibilidade.gov.pt/"
                            text={lngTexts.accessibilityLink3}
                            darkTheme={darkTheme}
                          />
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://www.acessibilidade.gov.pt/wcag/"
                            darkTheme={darkTheme}
                          >
                            <abbr
                              title="Web Content Accessibility Guidelines, version 2.1"
                              lang="en"
                            >
                              WCAG 2.1
                            </abbr>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-lg-4">
                      <h3 className="mb-2">
                        <strong>mosaico</strong>.gov.pt
                      </h3>
                      <p className="mb-4">
                        {lngTexts.usabilityText}
                      </p>
                      <ul className="ama-list">
                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://mosaico.gov.pt/areas-tecnicas/usabilidade"
                            text={lngTexts.usabilityLink1}
                            darkTheme={darkTheme}
                          />
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://zeroheight.com/1be481dc2/p/97181d-agora-design-system"
                            darkTheme={darkTheme}
                          >
                            {lngTexts.usabilityLink2}
                          </Link>
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://prd-agora.northeurope.cloudapp.azure.com"
                            darkTheme={darkTheme}
                          >
                            {lngTexts.usabilityLink3}
                          </Link>
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-realizar-testes-de-usabilidade"
                            text={lngTexts.usabilityLink4}
                            darkTheme={darkTheme}
                          />
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-desenvolver-aplicacoes-para-dispositivos-moveis"
                            text={lngTexts.usabilityLink5}
                            darkTheme={darkTheme}
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 col-lg-4">
                      <h3 className="mb-2">
                        <strong>selo.usabilidade</strong>.gov.pt
                      </h3>
                      <p className="mb-4">
                        {lngTexts.badgeText}
                      </p>
                      <ul className="ama-list">
                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://pprselo.usabilidade.gov.pt/candidatura/"
                            text={lngTexts.badgeLink1}
                            darkTheme={darkTheme}
                          />
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://pprselo.usabilidade.gov.pt/requisitos/"
                            text={lngTexts.badgeLink2}
                            darkTheme={darkTheme}
                          />
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://amagovpt.github.io/kit-selo/"
                            text={lngTexts.badgeLink3}
                            darkTheme={darkTheme}
                          />
                        </li>

                        <li className="mb-3">
                          <Link
                            iconLeft={
                              <Icon name="AMA-Setalongaoficial-Line" darkTheme={darkTheme} />
                            }
                            to="https://pprselo.usabilidade.gov.pt/ajuda/"
                            text={lngTexts.badgeLink4}
                            darkTheme={darkTheme}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="accordion-body ps-0 pe-0">
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6 align-self-center">
                      <div className="d-flex justify-content-between">
                        <div className="title-ecosssistema-ama">
                          <div className="h2">
                            {t("HEADER.DROPDOWN.ecosystem")}
                            <br />
                            <strong>acessibilidade</strong>.gov.pt
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 align-self-center">
                      <div className="description-ecossistema-ama">
                        <p>{t("HEADER.DROPDOWN.text")}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="mt-4 mb-5" />
                  <div className="row">
                    <div className="col-12 col-lg-4">
                      <div className="left-column-ecossistema-ama">
                        <div className="h3">
                          <strong>acessibilidade</strong>.gov.pt
                        </div>
                      </div>
                      <div className="left-column-ecossistema-ama">
                        <p>{t("HEADER.DROPDOWN.accessibility.text")}</p>
                      </div>
                      <div className="left-column-ecossistema-ama">
                        <div
                          style={{ height: "20px" }}
                          aria-hidden="true"
                          className="wp-block-spacer"
                        ></div>
                      </div>
                      <div className="left-column-ecossistema-ama">
                        <ul className="ama-list">
                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://observatorio.acessibilidade.gov.pt/"
                              text={t("HEADER.DROPDOWN.accessibility.link1")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://www.acessibilidade.gov.pt/gerador/"
                              text={t("HEADER.DROPDOWN.accessibility.link2")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://accessmonitor.acessibilidade.gov.pt/"
                              text={t("HEADER.DROPDOWN.accessibility.link3")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://www.acessibilidade.gov.pt/wcag/"
                            >
                              <abbr
                                title="Web Content Accessibility Guidelines, version 2.1"
                                lang="en"
                              >
                                WCAG 2.1
                              </abbr>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="center-column-ecossistema-ama">
                        <div className="h3">
                          <strong>mosaico</strong>.gov.pt
                        </div>
                      </div>
                      <div className="center-column-ecossistema-ama">
                        <p>{t("HEADER.DROPDOWN.usability.text")}</p>
                      </div>
                      <div className="center-column-ecossistema-ama">
                        <div
                          style={{ height: "20px" }}
                          aria-hidden="true"
                          className="wp-block-spacer"
                        ></div>
                      </div>
                      <div className="center-column-ecossistema-ama">
                        <ul className="ama-list">
                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://mosaico.gov.pt/areas-tecnicas/usabilidade"
                              text={t("HEADER.DROPDOWN.usability.link1")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://zeroheight.com/1be481dc2/p/97181d-agora-design-system"
                              text={t("HEADER.DROPDOWN.usability.link2")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://prd-agora.northeurope.cloudapp.azure.com"
                              text={t("HEADER.DROPDOWN.usability.link3")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-realizar-testes-de-usabilidade"
                              text={t("HEADER.DROPDOWN.usability.link5")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://guias.mosaico.gov.pt/guias-praticos/usabilidade-como-desenvolver-aplicacoes-para-dispositivos-moveis"
                              text={t("HEADER.DROPDOWN.usability.link6")}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-lg-4">
                      <div className="right-column-ecossistema-ama">
                        <div className="h3">
                          <strong>selo.usabilidade</strong>.gov.pt
                        </div>
                      </div>
                      <div className="right-column-ecossistema-ama">
                        <p>{t("HEADER.DROPDOWN.badge.text")}</p>
                      </div>
                      <div className="right-column-ecossistema-ama">
                        <div
                          style={{ height: "20px" }}
                          aria-hidden="true"
                          className="wp-block-spacer"
                        ></div>
                      </div>
                      <div className="right-column-ecossistema-ama">
                        <ul className="ama-list">
                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://pprselo.usabilidade.gov.pt/candidatura/"
                              text={t("HEADER.DROPDOWN.badge.link3")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://pprselo.usabilidade.gov.pt/requisitos/"
                              text={t("HEADER.DROPDOWN.badge.link5")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://amagovpt.github.io/kit-selo/"
                              text={t("HEADER.DROPDOWN.badge.link2")}
                            />
                          </li>

                          <li>
                            <Link
                              iconLeft={
                                <Icon name="AMA-Setalongaoficial-Line" />
                              }
                              to="https://pprselo.usabilidade.gov.pt/ajuda/"
                              text={t("HEADER.DROPDOWN.badge.link1")}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
