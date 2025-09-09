import React, { useState } from "react";
import { DashboardMenu } from "./";
import Documentation from './documentation.md'
import { MemoryRouter } from "react-router-dom";
export default {
    title: "components/Molecules/DashboardMenu",
    component: DashboardMenu,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: Documentation,
            },
        },
    },
};

const Template = (args) => {
    const [activeItem, setActiveItem] = useState(args.activeItem);

    const handleMenuItemClick = (obj) => {
        setActiveItem(obj);
    };

    return (
            <DashboardMenu
                {...args}
                activeItem={activeItem}
                onMenuItemClick={handleMenuItemClick}
            />
    );
};

export const Default = Template.bind({});
Default.args = {
    menuItems: [
        { id: "home", label: "Home", icon: "AMA-Casa-Line", url: "/" },
        { 
            id: "analytics", 
            label: "Categorias", 
            icon: "AMA-MarcadorGrande-Line", 
            url: "/",
            submenu: [
                { id: "cat1", label: "Categoria 1", icon: "AMA-Pasta-Line", url: "/cat1" },
                { id: "cat2", label: "Categoria 2", icon: "AMA-Pasta-Line", url: "/cat2" }
            ]
        },
        { id: "settings", label: "Diretórios", icon: "AMA-Pasta-Line", url: "/" },
        { id: "profile", label: "Utilizadores", icon: "AMA-Casa-Line", url: "/" },
        { id: "entity", label: "Entidades", icon: "AMA-Edificio-Line", url: "/" },
        { id: "websites", label: "Sítios web", icon: "AMA-Globo-Line", url: "/" },
        { id: "pages", label: "Páginas", icon: "AMA-Paginas-Line", url: "/" }
    ],
    activeItem: "home",
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    menuItems: [
        { id: "home", label: "Home", icon: "AMA-Casa-Line", url: "/" },
        { id: "analytics", label: "Categorias", icon: "AMA-MarcadorGrande-Line", url: "/" },
        { id: "settings", label: "Diretórios", icon: "AMA-Pasta-Line", url: "/" },
        { id: "profile", label: "Utilizadores", icon: "AMA-Casa-Line", url: "/" },
        { id: "entity", label: "Entidades", icon: "AMA-Edificio-Line", url: "/" },
        { id: "websites", label: "Sítios web", icon: "AMA-Globo-Line", url: "/" },
        { id: "pages", label: "Páginas", icon: "AMA-Paginas-Line", url: "/" }
    ],
    activeItem: "home",
    darkTheme: true,
};