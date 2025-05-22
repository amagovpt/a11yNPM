import React, { useState } from "react";
import DashboardMenu from ".";
import Documentation from './documentation.md'
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

    const handleMenuItemClick = (id) => {
        setActiveItem(id);
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
        { id: "home", label: "Home", icon: "AMA-Casa-Line" },
        { id: "analytics", label: "Categorias", icon: "AMA-MarcadorGrande-Line" },
        { id: "settings", label: "Diretórios", icon: "AMA-Pasta-Line" },
        { id: "profile", label: "Utilizadores", icon: "AMA-Casa-Line" },
        { id: "entity", label: "Entidades", icon: "AMA-Edificio-Line" },
        { id: "websites", label: "Sítios web", icon: "AMA-Globo-Line" },
        { id: "pages", label: "Páginas", icon: "AMA-Paginas-Line" }
    ],
    activeItem: "home",
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
    menuItems: [
        { id: "home", label: "Home", icon: "AMA-Casa-Line" },
        { id: "analytics", label: "Categorias", icon: "AMA-MarcadorGrande-Line" },
        { id: "settings", label: "Diretórios", icon: "AMA-Pasta-Line" },
        { id: "profile", label: "Utilizadores", icon: "AMA-Casa-Line" },
        { id: "entity", label: "Entidades", icon: "AMA-Edificio-Line" },
        { id: "websites", label: "Sítios web", icon: "AMA-Globo-Line" },
        { id: "pages", label: "Páginas", icon: "AMA-Paginas-Line" }
    ],
    activeItem: "home",
    darkTheme: true,
};