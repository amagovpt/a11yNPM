import React, { useEffect, useState } from "react";
import "./style.css";
import { Icon } from "../../Atoms/Icon"
import { Button } from "../../Atoms/Button"

/*
    hasSort -> If Table has sorting
    caption -> Table caption
    headers -> Custom Array of Headers
    dataList -> Array of data
    setDataList -> Set function to change the data shown based on sorting
    columnsOptions -> Custom array to help render the data cells
    nextPage -> Function used for the button click
    darkTheme -> If Dark theme activated or not
    pagination -> If Table has pagination
    itemsPaginationTexts -> Texts for the text telling how many items in that page out of the total
    nItemsPerPageTexts -> Texts for the selection of how many items per page (Pagination)
    iconsAltTexts -> Alternative texts for the icons of the data cells
    paginationButtonsTexts ->  texts for accessibility screen readers for the 4 buttons of pagination (Pagination)
    project -> name of project so that it works in multiple projects
    ariaLabels -> translations for aria-labels to help read "A", "AA", "AAA"
    setCheckboxesSelected -> method to change checkboxes states
*/
const SortingTable = (
    {
        hasSort,
        caption,
        headers,
        dataList,
        setDataList,
        columnsOptions,
        nextPage,
        darkTheme,
        pagination,
        itemsPaginationTexts,
        nItemsPerPageTexts,
        iconsAltTexts,
        paginationButtonsTexts,
        project,
        ariaLabels,
        setCheckboxesSelected,
        // New props for dynamic pagination
        totalItems, // total number of items (from endpoint)
        currentPage, // current page (controlled by parent)
        itemsPerPage, // items per page (controlled by parent)
        onPageChange, // function(pageNumber) => void
        onItemsPerPageChange, // function(itemsPerPage) => void
        paginationOptions, // array of numbers for items per page
        // Accessibility texts for sorting
        sortingTexts = {
            none: " Sem ordenação",
            ascending: " Ordenação ascendente",
            descending: " Ordenação descendente"
        }
    }) => {

    //SORT
    const [sort, setSort] = useState({ property: null, type: "" });

    //Multi Headers?
    const multiHeaders = Array.isArray(headers[0])

    //Remove internal state for page, lastPage, nItemsCurrent
    // const [page, setPage] = useState(1);
    // const [lastPage, setLastPage] = useState(1);
    // const [nItemsCurrent, setNItemsCurrent] = useState(50);
    // Instead, use props:
    const nAllItems = typeof totalItems === 'number' ? totalItems : (dataList ? dataList.length : 0);
    const page = typeof currentPage === 'number' ? currentPage : 1;
    const nItemsCurrent = typeof itemsPerPage === 'number' ? itemsPerPage : 50;
    const lastPage = Math.max(1, Math.ceil(nAllItems / nItemsCurrent));
    // Generate pagination options dynamically if not provided
    const defaultPaginationOptions = [10, 25, 50, 100, 250, 500].filter(opt => opt < nAllItems);
    if (!defaultPaginationOptions.includes(nAllItems)) defaultPaginationOptions.push(nAllItems);
    const pageOptions = Array.isArray(paginationOptions) && paginationOptions.length > 0 ? paginationOptions : defaultPaginationOptions;

    //Check
    const [checkedItems, setCheckedItems] = useState([]);

    // Theme
    const theme = darkTheme === "dark" ? "dark" : ""

    // useEffect that gives the data to the table
    // based on how many items per page is to be shown
    useEffect(() => {
        if (dataList && pagination) {
            // setPage(1) // Removed
            // setLastPage(Math.ceil(dataList.length / nItemsCurrent)) // Removed
            // setList(dataList.slice(0, nItemsCurrent)) // Removed
        } else {
            // setList(dataList) // Removed
        }
    }, [nItemsCurrent, dataList])

    // useEffect that runs after a page change
    // Gives the new data to the table
    useEffect(() => {
        if (dataList && pagination) {
            // const start = page === 1 ? 0 : (page-1) * nItemsCurrent // Removed
            // const end = page === 1 ? nItemsCurrent : page * nItemsCurrent // Removed
            // setList(dataList.slice(start, end)) // Removed
        } else {
            // setList(dataList) // Removed
        }
    }, [page])

    // Property sorting function
    const sortByProperty = (property) => {
        return dataList.slice().sort((a, b) => {
            // Gets the values for the given property
            const valueA = a[property]
            const valueB = b[property]

            // If its not the same property then the order is always ASCENDING
            // If its a repeting property then the type being ASCENDING will make
            // in the if's below to sort by DESCENDING
            let type = sort.type
            if (sort.property !== property) {
                type = "asc"
            }
            if (property && typeof valueA === "string") {
                if (type === "asc") {
                    // Set the last property and type of sorting
                    setSort({ property: property, type: "desc" })
                    return (valueA).localeCompare((valueB));
                } else {
                    setSort({ property: property, type: "asc" })
                    return (valueB).localeCompare((valueA));
                }
            } else {
                if (type === "asc") {
                    setSort({ property: property, type: "desc" })
                    if (valueA === null && valueB !== null) return 1;  // null values come after numbers
                    if (valueA !== null && valueB === null) return -1; // numbers come before null values
                    if (valueA === null && valueB === null) return 0;  // both are null
                    return parseFloat(valueA) - parseFloat(valueB);    // both are numbers
                } else {
                    setSort({ property: property, type: "asc" })
                    if (valueA === null && valueB !== null) return -1; // null values come before numbers
                    if (valueA !== null && valueB === null) return 1;  // numbers come after null values
                    if (valueA === null && valueB === null) return 0;  // both are null
                    return parseFloat(valueB) - parseFloat(valueA);    // both are numbers
                }
            }
        })
    }


    const addCheckboxes = (checkedData) => {
        if (checkedData !== 'all') {
            let newCheckedItems = [...checkedItems];
            const index = newCheckedItems.findIndex(item => item.id === checkedData.id);
            if (index !== -1) {
                newCheckedItems.splice(index, 1);
            } else {
                newCheckedItems.push(checkedData);
            }
            setCheckedItems(newCheckedItems);
            setCheckboxesSelected(newCheckedItems);
        } else {
            let newCheckedItems = [];

            if (checkedItems.length !== dataList.length) {
                newCheckedItems = [...dataList];
            }
            setCheckedItems(newCheckedItems);
            setCheckboxesSelected(newCheckedItems);
        }
    }



    // Function that renders the Headers of the Table
    // Receives an Object from the custom array that tells everything we need to render
    const renderHeader = (headerData, index) => {
        // If it specifies a nCol means that the header will be more than 1 column
        const nOfColumns = headerData.nCol ? headerData.nCol : 1
        const nOfRows = headerData.nRow ? headerData.nRow : 1
        const noPointer = !hasSort ? 'no_pointer' : ""
        const sameProp = sort.property === headerData.property
        const textCenter = headerData.justifyCenter ? "text-center" : ""
        const bigWidth = headerData.bigWidth ? headerData.bigWidth : "auto"
        const id = headerData.id ? headerData.id : null;

        switch (headerData.type) {
            case "Empty":
                return (<th id={multiHeaders ? id : null} key={index} style={{ width: bigWidth }} rowSpan={nOfRows} colSpan={nOfColumns} scope="col" className={`no_pointer`}>
                    <span className="visually-hidden">{headerData.name}</span>
                </th>)
            case "Text":
                return (<th id={multiHeaders ? id : null} aria-label={headerData.ariaLabel ? ariaLabels[headerData.name] : null} key={index} style={{ width: bigWidth }} rowSpan={nOfRows} colSpan={nOfColumns} scope="col" className={`${textCenter} no_pointer`}>
                    <span className="ama-typography-body text-center bold">{headerData.name}</span>
                </th>)
            case "SortingText":
                let justifyCenter = headerData.justifyCenter ? "justify-content-center" : ""
                const getSortState = () => {
                    if (!sameProp) return "none";
                    return sort.type === "desc" ? "descending" : "ascending";
                }
                const getSortStateText = () => {
                    if (!sameProp) return sortingTexts.none;
                    return sort.type === "desc" ? sortingTexts.descending : sortingTexts.ascending;
                }
                return (
                    <th id={multiHeaders ? id : null} key={index} style={{ width: bigWidth }} rowSpan={nOfRows} colSpan={nOfColumns} scope="col" aria-sort={getSortState()}>
                        <button
                            type="button"
                            className={`sorting-header-button ${sameProp ? 'show_icon' : ''}`}
                            onClick={() => setDataList(sortByProperty(headerData.property))}
                        >
                            {headerData.name}
                            <span className="arrow" aria-hidden="true">
                                {sameProp ?
                                    (sort.type === "desc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />) :
                                    <Icon name="AMA-SetaCima-Line" />
                                }
                            </span>
                            <span className="visually-hidden">{getSortStateText()}</span>
                        </button>
                    </th>
                )
            case "Icon":
                return (
                    <th id={multiHeaders ? id : null} key={index} style={{ width: bigWidth }} rowSpan={nOfRows} colSpan={nOfColumns} scope="col" className={`${textCenter} ${noPointer} first-show`}>
                        <Icon name={headerData.name} />
                        <span className="visually-hidden">{headerData.description}</span>
                    </th>
                )
            case "SortingIcon":
                const getSortStateIcon = () => {
                    if (!sameProp) return "none";
                    return sort.type === "desc" ? "descending" : "ascending";
                }
                const getSortStateTextIcon = () => {
                    if (!sameProp) return sortingTexts.none;
                    return sort.type === "desc" ? sortingTexts.descending : sortingTexts.ascending;
                }
                return (
                    <th id={multiHeaders ? id : null} key={index} style={{ width: bigWidth }} rowSpan={nOfRows} colSpan={nOfColumns} scope="col" aria-sort={getSortStateIcon()}>
                        <button
                            type="button"
                            className={`sorting-header-button first-show ${sameProp ? 'show_icon' : ''}`}
                            onClick={() => setDataList(sortByProperty(headerData.property))}
                        >
                            <Icon name={headerData.name} description={headerData.description} />
                            <span className="arrow" aria-hidden="true">
                                {sameProp ?
                                    (sort.type === "desc" ? <Icon name="AMA-SetaBaixo-Line" /> : <Icon name="AMA-SetaCima-Line" />) :
                                    <Icon name="AMA-SetaCima-Line" />
                                }
                            </span>
                            <span className="visually-hidden">{headerData.description} - {getSortStateTextIcon()}</span>
                        </button>
                    </th>
                )
            case "Checkbox":
                const checkboxId = `checkbox_all_${Math.random().toString(36).substring(2, 15)}`
                return (<th id={multiHeaders ? id : null} key={index} style={{ width: bigWidth }} rowSpan={nOfRows} colSpan={nOfColumns} scope="col" className={`${textCenter} checkbox px-4`}>
                    <label htmlFor={checkboxId}><span className="visually-hidden">{`${headerData.name}`}</span></label>
                    <input aria-label={headerData.name} type="checkbox" id={checkboxId} value="all" checked={Object.keys(checkedItems).length === dataList.length} onChange={() => addCheckboxes('all')}></input>
                </th>)
        }
    }


    const renderSpans = (spans) => {
        return spans.map((span, index) => {
            return (<span key={index} className="ama-typography-body mb-1">{span}</span>)
        })
    }

    // Function that renders the individual cells on the table
    // We receive an entire data row, then we go 1 by 1 on the properties of the object
    // Then we also get help from our --> columnsOptions
    // This custom array passed to the component helps us know what to render and what specifics for each cell
    // the custom array will have the same exact properties and for each one will tell if its a Text or a Number or an Icon ...
    const renderAttributes = (row) => {
        return Object.keys(row).map((key, index) => {
            let center = columnsOptions[key].center ? "text-center" : ""
            let bold = columnsOptions[key].bold ? "bold" : ""
            // Use the custom array to check the type of render to do
            switch (columnsOptions[key].type) {
                case "Skip":
                    // Don't render this property
                    return null
                case "Number":
                    // Render a number, if it has "decimalPlace" as TRUE then render the number with 1 decimal place
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>{columnsOptions[key].decimalPlace ? row[key]?.toFixed(1) : row[key]}</td>)
                case "Button":
                    let button = columnsOptions[key].onClick ? columnsOptions[key].onClick : () => { return "" }
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center}`} style={{ justifyItems: "center" }}>
                        <Button
                            darkTheme={theme}
                            className={`${columnsOptions[key].class}`}
                            variant={columnsOptions[key].variant}
                            text={columnsOptions[key].text}
                            onClick={button ? () => button(row, key) : null}
                        />
                    </td>)
                case "ButtonOrLink":
                    let hasDeclaration = columnsOptions[key].checkDeclaration ? (row["declaration"] !== null ? true : false) : true
                    let buttonAction = columnsOptions[key].onClick ? columnsOptions[key].onClick : () => { return "" }
                    let hrefButtonOrLink = columnsOptions[key].href ? columnsOptions[key].href : () => { return "" }
                    // Render a button
                    if (columnsOptions[key].checkDeclaration && (!hasDeclaration || row["declaration"] !== 3)) {
                        return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>{columnsOptions[key].noDeclaration}</td>)
                    } else {
                        switch (row[key]) {
                            case null:
                                return (<td headers={columnsOptions[key].headers} key={index} className={`${center}`} style={{ justifyItems: "center" }}>
                                    <Button
                                        darkTheme={theme}
                                        className={`${columnsOptions[key].class}`}
                                        variant={columnsOptions[key].variant}
                                        text={columnsOptions[key].text}
                                        onClick={buttonAction ? () => buttonAction(row, key) : null}
                                    />
                                </td>)
                            default:
                                return (<td headers={columnsOptions[key].headers} key={index} className={`${center}`}><a href={hrefButtonOrLink(row)} className="ama-typography-action-large bold text-center">{columnsOptions[key].options[row[key]]}</a></td>)
                        }
                    }
                case "Link":
                    let href = columnsOptions[key].href ? columnsOptions[key].href : () => { return "" }
                    // Render a link
                    return columnsOptions[key].children ? <td headers={columnsOptions[key].headers} key={index}>{columnsOptions[key].children(row, row[key])}</td> : <td headers={columnsOptions[key].headers} key={index}><a href={href(row)} className="ama-typography-body bold">{row[key]}</a></td>
                case "Text":
                    // Render normal text
                    if (columnsOptions[key].ariaLabel) {
                        return (<td headers={columnsOptions[key].headers} key={index} aria-label={ariaLabels[row[key]]} className={`${center} ${bold} ama-typography-body`}>{row[key]}</td>)
                    } else {
                        return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>{row[key]}</td>)
                    }
                case "Stamp":
                    // Render one of the 3 Stamp Icons based on the number received (from: 1 to 3)
                    const stampAlts = iconsAltTexts && iconsAltTexts.length >= 3 ? iconsAltTexts : [
                        "Selo Bronze", "Selo Prata", "Selo Ouro"
                    ];
                    switch (row[key]) {
                        case 1:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Selo_Bronze.svg`} alt={stampAlts[0]} /></td>)
                        case 2:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Selo_Prata.svg`} alt={stampAlts[1]} /></td>)
                        case 3:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Selo_Ouro.svg`} alt={stampAlts[2]} /></td>)
                        default:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}>{row[key]}</td>)
                    }
                case "Declaration":
                    // Render one of the 3 Declaration Icons based on the number received (from: 1 to 3)
                    const declarationAlts = iconsAltTexts && iconsAltTexts.length >= 6 ? iconsAltTexts.slice(3, 6) : [
                        "Declaração Não Conforme", "Declaração Parcialmente Conforme", "Declaração Conforme"
                    ];
                    switch (row[key]) {
                        case 1:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Declaracao_Nao_Conforme.svg`} alt={declarationAlts[0]} /></td>)
                        case 2:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Declaracao_Parcial_Conforme.svg`} alt={declarationAlts[1]} /></td>)
                        case 3:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><img src={`${project}img/SVG_Declaracao_Conforme.svg`} alt={declarationAlts[2]} /></td>)
                        default:
                            return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}>{row[key]}</td>)
                    }
                case "MultiText":
                    // Render 2 or more spans that are all normal text.
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} d-flex flex-column multi-text`}>{renderSpans(row[key])}</td>)
                case "DoubleText":
                    // Render 2 texts where the second one is bold and the first one not. If this property also comes with bold then all text will be bold
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold}`}><span className="ama-typography-body">{row[key][0]}</span><span className="ama-typography-body bold">{row[key][1]}</span></td>)
                case "DangerousHTML":
                    const hasCode = row[key].includes("<code>")
                    const hasMark = row[key].includes("<mark>")
                    const hasMeta = row[key].includes("<meta")
                    if (hasCode || hasMark || hasMeta) {
                        return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>
                            <span
                                className="span_code"
                                dangerouslySetInnerHTML={{ __html: row[key] }}
                            />
                        </td>)
                    } else {
                        return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ${bold} ama-typography-body`}>{row[key]}</td>)
                    }
                case "Checkbox":
                    return (<td headers={columnsOptions[key].headers} key={index} className={`${center} ama-typography-body checkbox`}>
                        <label aria-hidden="true" htmlFor={`checkbox_${row.id}`}><span className="visually-hidden">{dataList.length}</span></label>
                        <input aria-label={row["Uri"]} type="checkbox" id={`checkbox_${row.id}`} name={row.id} value={`${row}`} checked={checkedItems.findIndex(item => item.id === row.id) !== -1} onChange={() => addCheckboxes(row)}></input>
                    </td>)
            }
        })
    }

    const tableId = `sorting-table-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className={`ama sorting_table_responsive ${theme}`}>
            <table id={tableId} className="table sorting_table" data-sortable="true">
                {/* Table caption -> descripton of the table */}
                <caption>
                    {caption}
                </caption>
                <thead>
                    {/* Check if the array has multiple sub-arrays or not
                        If Yes then means theres more than 1 row of headers
                        If No then it's just 1 row of headers
                    */}
                    {headers && multiHeaders ?
                        // Multiple rows of headers
                        headers.map((row, index) => {
                            return (<tr key={index}>{row.map((th, index) => { return renderHeader(th, index) })}</tr>)
                        })
                        :
                        <>
                            {/* Just 1 row of headers */}
                            <tr>
                                {headers.map((th, index) => {
                                    return renderHeader(th, index)
                                })}
                            </tr>
                        </>
                    }
                </thead>

                <tbody>
                    {/* Render the data cells of the table */}
                    {dataList && dataList.map((row, index) => {
                        return (
                            <tr key={index}>
                                {renderAttributes(row)}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan={multiHeaders ? headers.map(header => header.length).reduce((a, b) => a + b, 0) : headers.length}>(*) Nota: conformidade para com as <a href="https://www.w3.org/TR/WCAG21/"><abbr title="Web Content Accessibility Guidelines">WCAG</abbr> do <abbr title="World Wide Web Consortium">W3C</abbr></a>.</td>
                    </tr>
                </tfoot>
            </table>

            {/* Pagination */}
            {pagination && <div className={`d-flex flex-row justify-content-between pagination ${theme}`}>
                {/* Section informing the number of items in that page from the total*/}
                <div className="ama-typography-body pagination_section">
                    {((page - 1) * nItemsCurrent) + 1 + " - " + (nAllItems > nItemsCurrent && page !== lastPage ? (page * nItemsCurrent) : nAllItems) + itemsPaginationTexts[0] + nAllItems + itemsPaginationTexts[1]}
                </div>

                {/* Section informing the number of items per page and option to change */}
                <nav className="pagination_section" aria-label="itens por página">
                    <span className="ama-typography-body">{nItemsPerPageTexts[0]}</span>
                    <select
                        aria-label={nItemsPerPageTexts[2]}
                        className="selection"
                        name="itemsPerPage"
                        id="itemsPerPage"
                        value={nItemsCurrent}
                        onChange={(e) => onItemsPerPageChange && onItemsPerPageChange(Number(e.target.value))}
                    >
                        {pageOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <span className="ama-typography-body">{nItemsPerPageTexts[1]}</span>
                </nav>

                {/* Section with the pagination navigation */}
                <nav className="pagination_section" aria-label="páginas" >
                    <button disabled={page === 1} className={page === 1 ? "disabled button_dir" : "button_dir"} onClick={() => onPageChange && onPageChange(1)}>
                        <span className="visually-hidden">{paginationButtonsTexts[0]}</span>
                        <Icon name="AMA-LastPage-Solid" />
                    </button>
                    <button disabled={page === 1} className={page === 1 ? "disabled button_dir" : " button_dir"} onClick={() => onPageChange && onPageChange(page - 1)}>
                        <span className="visually-hidden">{paginationButtonsTexts[1]}</span>
                        <Icon name="AMA-SetaDir3-Solid" />
                    </button>
                    <button disabled={page === lastPage} className={page === lastPage ? "disabled" : ""} onClick={() => onPageChange && onPageChange(page + 1)}>
                        <span className="visually-hidden">{paginationButtonsTexts[2]}</span>
                        <Icon name="AMA-SetaDir3-Solid" />
                    </button>
                    <button disabled={page === lastPage} className={page === lastPage ? "disabled" : ""} onClick={() => onPageChange && onPageChange(lastPage)}>
                        <span className="visually-hidden">{paginationButtonsTexts[3]}</span>
                        <Icon name="AMA-LastPage-Solid" />
                    </button>
                </nav>
            </div>}
        </div>
    );
};

export { SortingTable };