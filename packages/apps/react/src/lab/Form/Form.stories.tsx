import { useEffect, useState, type ChangeEvent } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { wait } from '@iziui/toolkit/promise';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';
import Input from '@/fields/Input';
import Button from '@/actions/Button';

import Form from './Form';
import Control from './Control';
import useForm from './useForm';
import useControl from './useControl';

interface FormData {
  name: string;
  surname: string;
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
        name: { defaultValue: 'John', type: 'email' },
        surname: { defaultValue: 'John', type: 'email' }
      },
      handle: {
        submit: (form) => {
          if (!form.isValid) { return; }
          alert('submitted: ' + JSON.stringify(form.values, null, 2));
        },
      }
    }, []);

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
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
};

export const _control: StoryObj<typeof Form> = {
  render: () => {
    const formGroup = useForm<FormData>({
      form: {
        name: { defaultValue: '', type: 'text' },
        surname: { defaultValue: 'John', type: 'email' }
      },
      handle: {
        submit: (form) => {
          if (!form.isValid) { return; }
          alert('submitted: ' + JSON.stringify(form.values, null, 2));
        },
      },
    }, []);

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
        name: { defaultValue: 'teste', type: 'text' },
        surname: { defaultValue: 'John', type: 'email' }
      },
      handle: {
        submit: (form) => {
          if (!form.isValid) { return; }
          alert('submitted: ' + JSON.stringify(form.values, null, 2));
        },
      },
    }, []);

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
    const [name, setName] = useState('');

    const formGroup = useForm<FormData>({
      form: {
        name: {
          type: 'text',
          defaultValue: name,
          validators: [
            (v) => !v.value && 'Nome é obrigatório',
            (v) => v.value.split(' ').length < 2 && 'Deve ter dois nomes'
          ]
        },
        surname: { defaultValue: '', type: 'email' }
      },
      handle: {
        submit: (form) => {
          if (!form.isValid) { return; }
          alert('submitted: ' + JSON.stringify(form.values, null, 2));
        },
      },
      validator: {
        surname: ({ values }) => {
          const { name, surname } = values;

          if (name !== surname) { return 'devem ser iguais'; }
        }
      }
    }, [name]);

    useEffect(() => {
      wait(() => { setName('LEOZIN'); }, 1000);
    }, []);

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
        <Control
          controlName="surname"
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