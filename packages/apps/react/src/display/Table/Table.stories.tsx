import type { Meta, StoryObj } from '@storybook/react';

import Stack from '@/layout/Stack';
import Button from '@/actions/Button';

import Chip from '../Chip';
import Icon from '../Icon';
import Table from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableHeader from './TableHeader';

const rows = [
  { id: 1, name: 'charmander', type: 'fire', level: 5 },
  { id: 2, name: 'squirtle', type: 'water', level: 5 },
  { id: 3, name: 'bulbasaur', type: 'grass', level: 5 },
  { id: 4, name: 'pikachu', type: 'electric', level: 5 },
  { id: 5, name: 'eevee', type: 'normal', level: 5 },
  { id: 6, name: 'abra', type: 'psychic', level: 5 },
];

const TYPE_MAP = {
  fire: { icon: '🔥', color: '#ff6500' },
  water: { icon: '💧', color: '#00a9ff' },
  grass: { icon: '🌿', color: '#00ff00' },
  electric: { icon: '⚡', color: '#ffea00' },
  normal: { icon: '🔘', color: '#a0a0a0' },
  psychic: { icon: '🔮', color: '#ff00ff' },
};

export const Basic: StoryObj<typeof Table> = {
  render: () => {
    return (
      <Table>
        <TableHeader>
          <TableCell align="center" style={{ width: 50 }}>id</TableCell>
          <TableCell align="right">tipo</TableCell>
          <TableCell align="right">nome</TableCell>
          <TableCell align="right">level</TableCell>
          <TableCell align="center">Ação</TableCell>
        </TableHeader>
        <TableBody>
          {
            rows.map((row, i) => {
              const map = TYPE_MAP[row.type];

              return (
                <tr key={i}>
                  <TableCell align="center">{row.id || '-'}</TableCell>
                  <TableCell align="right">
                    {
                      <Stack flexDirection="row" alignItems="center">
                        <Chip
                          size="small"
                          style={{
                            backgroundColor: 'transparent',
                            borderColor: map.color,
                          }}
                          label={`${map.icon} ${row.type}`}
                        />
                      </Stack>
                    }
                  </TableCell>
                  <TableCell align="right">{row.name || '-'}</TableCell>
                  <TableCell align="right">{row.level || '-'}</TableCell>
                  <TableCell align="center">
                    <Button size="small" onClick={() => console.debug(row)}>
                      Deletar
                    </Button>
                  </TableCell>
                </tr>
              );
            })
          }
        </TableBody>
      </Table>
    );
  },
};

export const Playground: StoryObj<typeof Table> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Table> = {
  title: 'display/Table',
  component: () => (
    <Table>
      <TableHeader>

        <TableCell align="left">prato</TableCell>
        <TableCell align="left">região</TableCell>
        <TableCell align="right">calorias</TableCell>
        <TableCell align="right">carboidratos</TableCell>
        <TableCell align="right">preço</TableCell>
      </TableHeader>
      <TableBody>
        <tr>
          <TableCell align="left">Feijoada</TableCell>
          <TableCell align="left">Rio de Janeiro</TableCell>
          <TableCell align="right">570 kcal</TableCell>
          <TableCell align="right">45 g</TableCell>
          <TableCell align="right">R$ 45,00</TableCell>
        </tr>
        <tr>
          <TableCell align="left">Pão de Queijo</TableCell>
          <TableCell align="left">Minas Gerais</TableCell>
          <TableCell align="right">80 kcal</TableCell>
          <TableCell align="right">10 g</TableCell>
          <TableCell align="right">R$ 8,00</TableCell>
        </tr>
        <tr>
          <TableCell align="left">Moqueca</TableCell>
          <TableCell align="left">Bahia</TableCell>
          <TableCell align="right">350 kcal</TableCell>
          <TableCell align="right">12 g</TableCell>
          <TableCell align="right">R$ 60,00</TableCell>
        </tr>
        <tr>
          <TableCell align="left">Açaí</TableCell>
          <TableCell align="left">Pará</TableCell>
          <TableCell align="right">250 kcal</TableCell>
          <TableCell align="right">35 g</TableCell>
          <TableCell align="right">R$ 18,00</TableCell>
        </tr>
        <tr>
          <TableCell align="left">Coxinha</TableCell>
          <TableCell align="left">São Paulo</TableCell>
          <TableCell align="right">290 kcal</TableCell>
          <TableCell align="right">25 g</TableCell>
          <TableCell align="right">R$ 7,50</TableCell>
        </tr>
      </TableBody>
    </Table>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description:
        'Todo: Table description',
      tag: (
        <Chip
          label="Display"
          icon={<Icon name="monitor" />}
          color="primary"
        />
      ),
    },
  },
};

export default meta;
