import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { wait } from '@iziui/toolkit/promise';
import { slug } from '@iziui/toolkit/string';
import { debounce } from '@iziui/toolkit/debounce';

import Icon from '@/display/Icon';
import Chip from '@/display/Chip';

import Autocomplete from './Autocomplete';
import AutocompleteButton from './AutocompleteButton';

type Option = {
  firstName: string;
  lastName: string;
  age: number;
};

const OPTIONS: Option[] = [
  { firstName: 'Michael', lastName: 'Scott', age: 45, },
  { firstName: 'Jim', lastName: 'Halpert', age: 31, },
  { firstName: 'Pam', lastName: 'Beesly', age: 30, },
  { firstName: 'Dwight', lastName: 'Schrute', age: 38, },
  { firstName: 'Ryan', lastName: 'Howard', age: 27, },
  { firstName: 'Kelly', lastName: 'Kapoor', age: 28, },
  { firstName: 'Angela', lastName: 'Martin', age: 37, },
  { firstName: 'Kevin', lastName: 'Malone', age: 40, },
  { firstName: 'Oscar', lastName: 'Martinez', age: 38, },
  { firstName: 'Stanley', lastName: 'Hudson', age: 52, },
  { firstName: 'Michael', lastName: 'Jordan', age: 64, },
];

const getMatch = (option: Option, value?: string) => {
  if (!value) { return true; }

  return slug(`${option.firstName} ${option.lastName}`)
    .includes(slug(value));
};

export const Default: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [value, setValue] = useState<Option>();

    const handleChange = (data?: Option) => { setValue(data); };

    return (
      <Autocomplete
        label="Label"
        placeholder="Digite aqui..."
        helperText="helperText"
        startIcon={<Icon name="search" color="grey" />}
        value={value}
        options={OPTIONS}
        onChange={handleChange}
        filterOptions={getMatch}
        renderOption={(option) => (
          <AutocompleteButton
            key={option.firstName}
            value={option}
          >
            {`${option.firstName} ${option.lastName}`}
          </AutocompleteButton>
        )}
      />
    );
  },
};

export const WithRequest: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [value, setValue] = useState<Option>();

    const handleChange = (data?: Option) => { setValue(data); };

    const makeRequest = () => {
      setLoading(true);
      wait(() => {
        setLoading(false);

        setOptions(OPTIONS);
      }, 2000);
    };

    return (
      <Autocomplete
        label="Label"
        helperText="helperText"
        placeholder="Digite aqui..."
        startIcon={<Icon name="search" color="grey" />}
        loading={loading}
        options={options}
        value={value}
        onOpen={makeRequest}
        onChange={handleChange}
        filterOptions={getMatch}
        renderOption={(option) => (
          <AutocompleteButton
            key={option.firstName}
            value={option}
          >
            {`${option.firstName} ${option.lastName}`}
          </AutocompleteButton>
        )}
      />
    );
  },
};

export const WithSearch: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [value, setValue] = useState<Option>();

    const handleChange = (data?: Option) => { setValue(data); };

    const makeRequest = (value: string) => {
      setLoading(true);
      wait(() => {
        setLoading(false);

        const filtered = OPTIONS.filter((option) => {
          return slug(`${option.firstName} ${option.lastName}`)
            .includes(slug(value));
        });

        setOptions(filtered);
      }, 2000);
    };

    const getMatch = () => { return true; };

    const handleSearch = (value: string) => {
      debounce.delay(() => { makeRequest(value); }, 500);
    };

    return (
      <Autocomplete
        label="Label"
        helperText="helperText"
        placeholder="Digite aqui..."
        startIcon={<Icon name="search" color="grey" />}
        loading={loading}
        value={value}
        options={options}
        onSearch={handleSearch}
        onChange={handleChange}
        filterOptions={getMatch}
        renderOption={(option) => (
          <AutocompleteButton
            key={option.firstName}
            value={option}
          >
            {`${option.firstName} ${option.lastName}`}
          </AutocompleteButton>
        )}
      />
    );
  },
};

export const WithValue: StoryObj<typeof Autocomplete> = {
  render: () => {
    const [value, setValue] = useState<Option | undefined>(OPTIONS[1]);

    const handleChange = (data?: Option) => { setValue(data); };

    return (
      <Autocomplete
        label="Label"
        placeholder="Digite aqui..."
        helperText="helperText"
        startIcon={<Icon name="search" color="grey" />}
        options={OPTIONS}
        value={value}
        onChange={handleChange}
        filterOptions={getMatch}
        renderOption={(option) => (
          <AutocompleteButton
            key={option.firstName}
            value={option}
          >
            {`${option.firstName} ${option.lastName}`}
          </AutocompleteButton>
        )}
      />
    );
  },
};

export const Playground: StoryObj<typeof Autocomplete> = {
  tags: ['!dev'],
};

const meta: Meta<typeof Autocomplete> = {
  title: 'fields/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      ref: Playground,
      description: 'Todo: Autocomplete description',
      tag: (
        <Chip
          label="Layout"
          color="info"
          icon={<Icon name="keyboard" />}
        />
      ),
    },
  },
};

export default meta;
