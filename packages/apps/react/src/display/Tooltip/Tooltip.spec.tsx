import { fireEvent, render, screen } from '@testing-library/react';

import Tooltip from './Tooltip';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

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
