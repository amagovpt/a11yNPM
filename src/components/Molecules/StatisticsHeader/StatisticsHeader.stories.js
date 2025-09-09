import React from "react";
import { StatisticsHeader } from "./index";
import Documentation from './Documentation.md'
import { useDarkMode } from 'storybook-dark-mode';

const directoriesStats = {
  score: (8.486663447825674).toFixed(1),
  recentPage: "16 de outubro de 2023",
  oldestPage: "16 de outubro de 2023",
  statsTable: [
    1,
    24,
    26,
    1423,
  ]
}

const statsTitles = [
  "Diretórios",
  "Entidades",
  "Sítios Web",
  "Páginas"
]

export default {
  title: "components/Molecules/StatisticsHeader",
  component: StatisticsHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: Documentation,
      },
    },
  },
  argTypes: {
    tag: {
      control: 'text',
      description: 'Tag HTML usada para o título',
      type: { name: 'string', required: false },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'h2' },
      },
    },
    showGauge: {
      control: 'boolean',
      description: 'Exibe o gauge de pontuação média',
      type: { name: 'boolean', required: false },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    }
  },
};

export const HeaderStatistics = (args) => {
  return (
    <StatisticsHeader {...args} darkTheme={useDarkMode() ? "dark" : "light"} />
  )
};

HeaderStatistics.args = {
  title: "Estatísticas",
  gaugeDescription: "",
  gaugeType: "",
  subtitle: "Metadados",
  oldestPage: "Avaliação mais antiga de uma página:",
  newestPage: "Avaliação mais recente de uma página:",
  gaugeTitle: ["Pontuação média"],
  statsTitles: statsTitles,
  stats: directoriesStats,
  tag: "h2",
}
