import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { getFileSize } from '@iziui/toolkit/file';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Stack from '@/layout/Stack';
import Typography from '@/display/Typography';
import ButtonIcon from '@/actions/ButtonIcon';

import InputFile from './InputFile';

export const Default: StoryObj<typeof InputFile> = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    const success = Boolean(files.length);

    return (
      <div style={{ width: 550 }}>
        <InputFile
          multiple
          files={files}
          success={success}
          placeholder="Clique ou arraste a imagem aqui"
          helperText={success ? 'Arquivo adicionado' : 'Erro ao adicionar arquivo'}
          onChange={setFiles}
          renderFiles={(files) => (
            <Stack>
              {
                files.map(file => (
                  <Stack
                    key={file.name}
                    alignItems="center"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Stack flexDirection="row" alignItems="center">
                      <Icon name="file" />
                      <Stack gap={0}>
                        <Typography variant="body2" style={{ fontWeight: 600 }}>
                          {file.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getFileSize(file.size)}
                        </Typography>
                      </Stack>
                    </Stack>
                    <ButtonIcon
                      color="error"
                      onClick={() => setFiles(prev => prev.filter(f => file.name !== f.name))}
                    >
                      <Icon name="trash" />
                    </ButtonIcon>
                  </Stack>
                ))
              }
            </Stack>
          )}
        />
      </div>
    );
  }
};

export const Playground: StoryObj<typeof InputFile> = {
  tags: ['!dev'],
};

const meta: Meta<typeof InputFile> = {
  title: 'fields/InputFile',
  component: InputFile,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'TODO: InputFile description',
      tag: (
        <Chip
          label="Layout"
          color="info"
          icon={<Icon name="keyboard" />}
        />
      ),
    }
  },
};

export default meta;
