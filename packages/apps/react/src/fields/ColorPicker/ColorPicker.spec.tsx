import { fireEvent, render, screen } from '@/test/render';

import ColorPicker from './ColorPicker';

describe('ColorPicker', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('shows its label and selected color', () => {
    render(
      <ColorPicker
        label="Pick a color"
        value="#ffffff"
        onChange={jest.fn()}
      />
    );

    expect(screen.getByText('Pick a color')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '#ffffff' })).toBeInTheDocument();
  });

  it('forwards native color input events after opening the picker', () => {
    const onInput = jest.fn();

    render(
      <ColorPicker
        label="Pick a color"
        value="#ffffff"
        onChange={jest.fn()}
        onInput={onInput}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '#ffffff' }));
    fireEvent.input(screen.getByDisplayValue('#ffffff'), { target: { value: '#000000' } });

    expect(onInput).toHaveBeenCalledTimes(1);
  });
});
