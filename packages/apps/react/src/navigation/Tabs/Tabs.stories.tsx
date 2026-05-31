import type { Meta, StoryObj } from '@storybook/react';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Stack from '@/layout/Stack';
import Typography from '@/display/Typography';

import Tabs from './Tabs';
import TabButton from './TabButton';
import TabContent from './TabContent';
import useTabs from './useTabs';

const panels = [
  {
    icon: 'sun',
    title: 'Visão Geral',
    body: 'Acompanhe os principais indicadores e métricas da plataforma em tempo real. ' +
      'Esta aba reúne um resumo completo do desempenho geral, facilitando a tomada de decisões rápidas.',
  },
  {
    icon: 'moon',
    title: 'Atividade Recente',
    body: 'Veja o histórico de ações e eventos registrados nas últimas 24 horas. ' +
      'As informações são atualizadas automaticamente para garantir que você esteja sempre com os dados mais recentes.',
  },
  {
    icon: 'star',
    title: 'Destaques',
    body: 'Explore os itens marcados como favoritos e os conteúdos mais acessados da semana. ' +
      'Use esta seção para acessar rapidamente o que é mais relevante para você.',
  },
];

function TabPanels({ current }: { current: number }) {
  return (
    <>
      {panels.map((panel, index) => (
        <TabContent key={panel.icon} current={current} value={index}>
          <Stack gap={12} style={{ padding: '24px 0', width: 480 }}>
            <Stack flexDirection="row" alignItems="center" gap={8}>
              <Icon name={panel.icon} size={20} sx={{ color: ({ text }) => text.secondary }} />
              <Typography variant="h5">{panel.title}</Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: ({ text }) => text.secondary }}>
              {panel.body}
            </Typography>
          </Stack>
        </TabContent>
      ))}
    </>
  );
}

export const Default: StoryObj<typeof Tabs> = {
  render: () => {
    const [setTab, currentTab] = useTabs(0);

    return (
      <>
        <Tabs onChange={setTab} current={currentTab}>
          <TabButton label="Visão Geral" icon={<Icon name="sun" />} />
          <TabButton label="Atividade" icon={<Icon name="moon" />} />
          <TabButton label="Destaques" icon={<Icon name="star" />} />
        </Tabs>
        <TabPanels current={currentTab} />
      </>
    );
  },
};

export const LineDisabled: StoryObj<typeof Tabs> = {
  render: () => {
    const [setTab, currentTab] = useTabs(0);

    return (
      <>
        <Tabs onChange={setTab} current={currentTab}>
          <TabButton label="Visão Geral" icon={<Icon name="sun" />} disabled />
          <TabButton label="Atividade" icon={<Icon name="moon" />} />
          <TabButton label="Destaques" icon={<Icon name="star" />} />
        </Tabs>
        <TabPanels current={currentTab} />
      </>
    );
  }
};

export const WithScrollInto: StoryObj<typeof Tabs> = {
  render: () => {
    const [setTab, currentTab] = useTabs(1);

    return (
      <>
        <Tabs onChange={setTab} current={currentTab}>
          <TabButton label="Visão Geral e Resumo" />
          <TabButton label="Atividade Recente" />
          <TabButton label="Destaques da Semana" />
        </Tabs>
        <TabPanels current={currentTab} />
      </>
    );
  }
};

export const Playground: StoryObj<typeof Tabs> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Tabs> = {
  title: 'navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'TODO: Tabs description',
      tag: (
        <Chip
          label="Navigation"
          icon={<Icon name="map" />}
          color="info"
        />
      ),
    },
  },
};

export default meta;
