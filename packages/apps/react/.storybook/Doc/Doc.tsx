import React from 'react';

import { Source, Title, Controls, useOf, Canvas } from '@storybook/blocks';

import CardInfo from './CardInfo';
import Stack from '../../src/layout/Stack';
import { Grid, GridItem } from '../../src/layout/Grid';

import './Doc.scss';

export default function Doc() {
  const { preparedMeta } = useOf('meta', ['meta']);

  const parameters = preparedMeta.parameters ?? {};
  const docs = parameters.docs ?? {};

  const code = docs.import || `import ${name} from '@iziui/react/${name}';`;

  const goSlack = () => { };
  const goDonate = () => { };
  const goNews = () => { };

  return (
    <Stack className="doc" gap={32}>
      <Stack gap={8}>
        <Stack flexDirection="row" alignItems="center">
          <Title />
          {docs.tag}
        </Stack>
        <h4>{docs.description}</h4>
        {docs.ref && <Canvas of={docs.ref} />}
        {docs.alert}
      </Stack>

      <Stack className="doc-import">
        <h3>Import</h3>
        <Source code={code} language="tsx" />
      </Stack>

      {
        docs.ref && (
          <Stack className="doc-props">
            <h3>Props</h3>
            <Controls of={docs.ref} />
          </Stack>
        )
      }

      <Stack>
        <h3>Ajuda & Suporte</h3>
        <Grid xl={4}>
          <GridItem>
            <CardInfo
              icon="slack"
              title="Canal de suporte"
              description="Dúvidas? Fale conosco pelo canal de suporte dentro do nosso Slack."
              onClick={goSlack}
            />
          </GridItem>
          <GridItem>
            <CardInfo
              icon="github"
              title="Novidades"
              description="Fique por dentro de tudo que há de novo."
              onClick={goNews}
            />
          </GridItem>
          <GridItem>
            <CardInfo
              icon="paypal"
              title="Doação"
              description="Contriua para a evolução desse projeto."
              onClick={goDonate}
            />
          </GridItem>
        </Grid>
      </Stack>
    </Stack>
  );
}