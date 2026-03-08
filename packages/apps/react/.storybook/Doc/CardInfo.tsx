import React from 'react';

import Stack from '../../src/layout/Stack';
import Icon from '../../src/display/Icon';
import Typography from '../../src/display/Typography';
import { Card, CardContent } from '../../src/components/Card';

interface CardInfoProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

export default function CardInfo({ icon, title, description }: CardInfoProps) {
  return (
    <Card style={{ height: '100%' }} onClick={console.log}>
      <Stack
        flexDirection="column"
        justifyContent="flex-end"
        sx={{
          p: 2,
          background: ({ background }) => background.paper
        }}
        style={{
          height: 75
        }}
      >
        <Icon name={icon} color="primary.main" />
      </Stack>
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
}