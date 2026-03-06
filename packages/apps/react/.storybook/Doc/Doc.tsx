import React from 'react';

import { Controls, Source, Primary, Title, useOf } from '@storybook/blocks';

import Stack from '../../src/components/Stack';
import { Card, CardContent } from '../../src/components/Card';
// import { } from '../../src/components/Grid';

import './Doc.scss';

export default function Doc() {
  const { preparedMeta } = useOf('meta', ['meta']);

  const { title } = preparedMeta;

  const parameters = preparedMeta.parameters ?? {};
  const docs = parameters.docs ?? {};

  const [category, name] = title.split('/');

  const code = `import ${name} from '@iziui/react//${name}'`;

  return (
    <Stack gap={32} className="doc doc-container">
      <div>
        <Stack flexDirection="row" alignItems="center">
          <Title />
          <span>{category}</span>
        </Stack>
        <h4>{docs.description}</h4>
      </div>

      <Stack className="doc-import">
        <h3>Import</h3>
        <Source code={code} language="tsx" />
      </Stack>

      <Stack>
        <h3>Ajuda & Suporte</h3>
        <Card>
          <CardContent>
            <p>Canal de suporte</p>
            <p>
              Dúvidas? Fale conosco pelo canal de suporte dentro do nosso Slack.
            </p>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
}