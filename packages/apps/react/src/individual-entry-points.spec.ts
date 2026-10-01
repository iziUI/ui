import Card from './display/Card';
import * as CardEntry from './display/Card';
import Table from './display/Table';
import * as TableEntry from './display/Table';
import Modal from './feedback/Modal';
import * as ModalEntry from './feedback/Modal';
import Toast from './feedback/Toast';
import * as ToastEntry from './feedback/Toast';
import Autocomplete from './fields/Autocomplete';
import * as AutocompleteEntry from './fields/Autocomplete';
import Select from './fields/Select';
import * as SelectEntry from './fields/Select';
import Grid from './layout/Grid';
import * as GridEntry from './layout/Grid';
import Drawer from './navigation/Drawer';
import * as DrawerEntry from './navigation/Drawer';
import Menu from './navigation/Menu';
import * as MenuEntry from './navigation/Menu';
import Tabs from './navigation/Tabs';
import * as TabsEntry from './navigation/Tabs';
import Form from './lab/Form';
import * as FormEntry from './lab/Form';
import type { CardContentProps } from './display/Card';
import type { TableBodyProps, TableCellProps, TableHeaderProps } from './display/Table';
import type { ModalFooterProps } from './feedback/Modal';
import type { ToastContextConfig, ToastProviderProps } from './feedback/Toast';
import type { AutocompleteButtonProps } from './fields/Autocomplete';
import type { OptionProps, OptionValue } from './fields/Select';
import type { GridItemProps } from './layout/Grid';
import type { DrawerContentProps, DrawerFooterProps, DrawerHeaderProps } from './navigation/Drawer';
import type { MenuButtonProps } from './navigation/Menu';
import type { TabButtonProps, TabContentProps } from './navigation/Tabs';
import type { AbstractControl, ControlProps, FormValue, FormValues } from './lab/Form';

type IndividualEntryPointTypes = [
  CardContentProps,
  TableBodyProps,
  TableCellProps,
  TableHeaderProps,
  ModalFooterProps,
  ToastContextConfig,
  ToastProviderProps,
  AutocompleteButtonProps<string>,
  OptionProps,
  OptionValue,
  GridItemProps,
  DrawerContentProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  MenuButtonProps,
  TabButtonProps,
  TabContentProps,
  AbstractControl<Record<string, FormValue>>,
  ControlProps<{ value: string }, 'value'>,
  FormValues,
];

const individualEntryPointTypes: IndividualEntryPointTypes | null = null;

describe('individual entry points', () => {
  it('preserves public types', () => {
    expect(individualEntryPointTypes).toBeNull();
  });

  it('exports primary components as defaults without named component exports', () => {
    expect(Card).toBeDefined();
    expect(Table).toBeDefined();
    expect(Modal).toBeDefined();
    expect(Toast).toBeDefined();
    expect(Autocomplete).toBeDefined();
    expect(Select).toBeDefined();
    expect(Grid).toBeDefined();
    expect(Drawer).toBeDefined();
    expect(Menu).toBeDefined();
    expect(Tabs).toBeDefined();
    expect(Form).toBeDefined();

    expect(CardEntry).not.toHaveProperty('Card');
    expect(TableEntry).not.toHaveProperty('Table');
    expect(ModalEntry).not.toHaveProperty('Modal');
    expect(ToastEntry).not.toHaveProperty('Toast');
    expect(AutocompleteEntry).not.toHaveProperty('Autocomplete');
    expect(SelectEntry).not.toHaveProperty('Select');
    expect(GridEntry).not.toHaveProperty('Grid');
    expect(DrawerEntry).not.toHaveProperty('Drawer');
    expect(MenuEntry).not.toHaveProperty('Menu');
    expect(TabsEntry).not.toHaveProperty('Tabs');
    expect(FormEntry).not.toHaveProperty('Form');
  });

  it('exports CardContent from its own default entry point', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const CardContent = require('./display/CardContent').default;

    expect(CardContent).toBeDefined();
  });
});
