import React from 'react';

import { Source, Title, Controls, useOf, Canvas } from '@storybook/blocks';

import Chip, { type ChipProps } from '../../src/display/Chip';
import Stack from '../../src/layout/Stack';
import { Grid, GridItem } from '../../src/layout/Grid';
import CardInfo from './CardInfo';

import './Doc.scss';

export default function Doc() {
  const { preparedMeta } = useOf('meta', ['meta']);

  const { title } = preparedMeta;

  const parameters = preparedMeta.parameters ?? {};
  const docs = parameters.docs ?? {};

  const [category, name] = title.split('/');

  console.log('>>> docs', docs.ref.parameters.docs.source);
  console.log('>>> parameters', parameters);

  const MAP: { [X in string]: ChipProps['color'] } = {
    animations: 'success',
    components: 'warning',
    display: 'info',
    fields: 'secondary',
    lab: 'error',
    layout: 'default',
  };

  const code = docs.import || `import ${name} from '@iziui/react/${name}';`;

  const goSlack = () => { };
  const goDonate = () => { };
  const goNews = () => { };

  return (
    <Stack className="doc" gap={32}>
      <Stack gap={8}>
        <Stack flexDirection="row" alignItems="center">
          <Title />
          <Chip
            size="small"
            color={MAP[category]}
            label={category}
            style={{ textTransform: 'capitalize' }}
          />
        </Stack>
        <h4>{docs.description}</h4>
        {docs.ref && <Canvas of={docs.ref} />}
      </Stack>

      <Stack className="doc-import">
        <h3>Import</h3>
        <Source code={code} language="tsx" />
      </Stack>

      <Stack className="doc-props">
        <h3>Props</h3>
        <Controls of={docs.ref} />
      </Stack>

      <Stack>
        <h3>Ajuda & Suporte</h3>
        <Grid xl={4}>
          <GridItem>
            <CardInfo
              onClick={goSlack}
              icon="slack"
              title="Canal de suporte"
              description="Dúvidas? Fale conosco pelo canal de suporte dentro do nosso Slack."
            />
          </GridItem>
          <GridItem>
            <CardInfo
              onClick={goDonate}
              icon="credit-card"
              title="Doação"
              description="Contriua para a evolução desse projeto."
            />
          </GridItem>
          <GridItem>
            <CardInfo
              onClick={goNews}
              icon="fire"
              title="Novidades"
              description="Fique por dentro de tudo que há de novo."
            />
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  );
}