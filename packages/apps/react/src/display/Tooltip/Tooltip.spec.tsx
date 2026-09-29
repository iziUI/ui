import { fireEvent, render, screen } from '@/test/render';

import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('shows its label when users hover its child', () => {
    render(
      <Tooltip label="Helpful description">
        <button type="button">More information</button>
      </Tooltip>
    );

    const tooltip = screen.getByText('Helpful description');
    expect(tooltip).not.toBeVisible();

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'More information' }));

    expect(tooltip).toBeVisible();
  });
});
