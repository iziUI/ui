import { fireEvent, render, screen } from '@/test/render';
import Switch from '@/fields/Switch';

import { createControl } from './Control';
import Form from './Form';
import FormControl from './FormControl';
import FormGroup from './FormGroup';

type FormData = {
  enabled: boolean;
};

describe('Control', () => {
  it('updates a switch control from its change event', () => {
    const formGroup = new FormGroup<FormData>({
      enabled: new FormControl({ defaultValue: false }),
    }, {});

    const Control = createControl<FormData>();

    formGroup.hydrate = () => undefined;

    render(
      <Form formGroup={formGroup}>
        <Control
          action="change"
          controlName="enabled"
          field={(control) => <Switch label="Enabled" checked={control.value} />}
        />
      </Form>
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(formGroup.values.enabled).toBe(true);
  });
});
