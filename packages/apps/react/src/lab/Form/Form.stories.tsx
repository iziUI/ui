import type { ChangeEvent } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import logger from '@iziui/toolkit/logger';

import Input from '@/fields/Input';
import Button from '@/actions/Button';
import Chip from '@/display/Chip';
import Icon from '@/display/Icon';

import Form from './Form';
import Control from './Control';
import useForm from './useForm';
import useControl from './useControl';

type FormData = {
  name: string;
}

const meta: Meta<typeof Form> = {
  title: 'Lab/Form',
  component: Form,
  parameters: {
    docs: {
      description: 'Componente para gerenciamento de formulários com controles, validações e submit.',
      tag: (
        <Chip
          label="Lab"
          color="secondary"
          icon={<Icon name="flask" />}
        />
      )
    },
  }
};

function InputUseControl() {
  const { control, update } = useControl<FormData>('name');

  return (
    <Input
      onInput={(e: any) => update(e.target.value)}
      value={control.value}
      error={control.isInvalid}
      helperText={control.error}
    />
  );
}

export const _useForm: StoryObj<typeof Form> = {
  render: () => {
    const formGroup = useForm<FormData>({
      form: {
        name: { defaultValue: 'leozinho', type: 'email' }
      },
      handle: {
        submit: (form) => {
          logger.log('>>> submit', form);
        },
      }
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value;

      formGroup.setValues({ name });
    };

    return (
      <Form formGroup={formGroup} debug>
        <Input
          onInput={(e: any) => handleInput(e)}
          value={formGroup.controls.name.value}
          error={formGroup.controls.name.isInvalid}
          helperText={formGroup.controls.name.error}
        />
        <Button>Submit</Button>
      </Form>
    );
  }
};

export const _control: StoryObj<typeof Form> = {
  render: () => {
    const formGroup = useForm<FormData>({
      form: {
        name: { defaultValue: '', type: 'text' }
      },
      handle: {
        submit: (form) => {
          logger.log('>>> submit', form.values);
        },
      },
    });

    return (
      <Form formGroup={formGroup} debug>
        <Control
          controlName="name"
          field={(control) => (
            <Input
              value={control.value}
              error={control.isInvalid}
              helperText={control.error}
            />
          )}
        />
        <Button>Submit</Button>
      </Form>
    );
  }
};

export const _useControl: StoryObj<typeof Form> = {
  render: () => {
    const formGroup = useForm<FormData>({
      form: {
        name: { defaultValue: 'teste', type: 'text' }
      },
      handle: {
        submit: (form) => {
          logger.log('>>> submit', form);
        },
      },
    });

    return (
      <Form formGroup={formGroup} debug>
        <InputUseControl />
        <Button>Submit</Button>
      </Form>
    );
  }
};

export const _validator: StoryObj<typeof Form> = {
  render: () => {
    const formGroup = useForm<FormData>({
      form: {
        name: {
          type: 'text',
          defaultValue: 'teste',
          validators: [
            (v) => !v.value && 'Nome é obrigatório',
            (v) => v.value.split(' ').length < 2 && 'Deve ter dois nomes'
          ]
        }
      },
      handle: {
        submit: (form) => {
          logger.log('>>> submit', form);
        },
      },
      validator: {
        name: ({ values }) => {
          const { name } = values;

          const DEFAULT_NAME = 'leo goncalves';

          if (name !== DEFAULT_NAME) { return `O nome deve ser ${DEFAULT_NAME}`; }
        }
      }
    });

    return (
      <Form formGroup={formGroup} debug>
        <Control
          controlName="name"
          field={(control) => (
            <Input
              value={control.value}
              error={control.isInvalid}
              helperText={control.error}
            />
          )}
        />
        <Button>Submit</Button>
      </Form>
    );
  }
};

export default meta;