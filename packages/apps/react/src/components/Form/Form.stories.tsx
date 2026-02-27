import type { ChangeEvent } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Form from './Form';
import useForm from './useForm';
import useControl from './useControl';
import Control from './Control';
import Button from '../Button';
import Stack from '../Stack';
import Input from '../Input';

type FormData = {
  name: string;
}

const meta: Meta<typeof Form> = {
  title: 'components/Form',
  component: Form,
  tags: ['autodocs'],
};

export const _useForm: StoryObj<typeof Form> = {
  render: () => {
    const formGroup = useForm<FormData>({
      form: {
        name: { defaultValue: 'leozinho', type: 'email', required: true }
      },
      handle: {
        change: (form) => {
          console.log('>>> handle', form.values);
        },
        submit: (form) => {
          console.log('>>> submit', form);
        },
      },
      validator: {
        name: (form) => {
          const { name } = form.values;

          const lengthIsValid = name.length >= 18;

          if (lengthIsValid) { return ''; }

          return 'Deve ter no mínimo 18 caracteres';
        }
      }
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value;

      formGroup.setValues({ name });
    };

    return (
      <Form formGroup={formGroup} debug>
        <Stack>
          <Input
            width={200}
            onInput={(e: any) => handleInput(e)}
            value={formGroup.controls.name.value}
            error={formGroup.controls.name.isInvalid}
            helperText={formGroup.controls.name.error}
          />
          <Button>Submit</Button>
        </Stack>
      </Form>
    );
  }
};

export const _control: StoryObj<typeof Form> = {
  render: () => {
    const formGroup = useForm<FormData>({
      form: {
        name: { defaultValue: '', type: 'text', required: true }
      },
      handle: {
        submit: (form) => {
          // console.log('>>> submit', form);
        },
      },
    });

    return (
      <Form formGroup={formGroup} debug>
        <Stack>
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
        </Stack>
      </Form>
    );
  }
};

export const _useControl: StoryObj<typeof Form> = {
  render: () => {
    const formGroup = useForm<FormData>({
      form: {
        name: { defaultValue: '', type: 'text', required: true }
      },
      handle: {
        submit: (form) => {
          // console.log('>>> submit', form);
        },
      },
    });

    return (
      <Form formGroup={formGroup} debug>
        <Stack>
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
        </Stack>
      </Form>
    );
  }
};

export default meta;