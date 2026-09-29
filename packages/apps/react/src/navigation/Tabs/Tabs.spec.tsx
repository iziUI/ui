import { fireEvent, render, screen } from '@/test/render';

import Tabs from './Tabs';
import TabButton from './TabButton';

Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: jest.fn(),
});

describe('Tabs', () => {
  it('marks the current tab as selected', () => {
    render(
      <Tabs current={0}>
        <TabButton label="Overview" />
        <TabButton label="Activity" />
      </Tabs>
    );

    expect(screen.getByRole('button', { name: 'Overview' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('button', { name: 'Activity' })).toHaveAttribute('aria-checked', 'false');
  });

  it('changes the current tab and reports its index', () => {
    const onChange = jest.fn();

    render(
      <Tabs current={0} onChange={onChange}>
        <TabButton label="Overview" />
        <TabButton label="Activity" />
      </Tabs>
    );

    const activity = screen.getByRole('button', { name: 'Activity' });
    fireEvent.click(activity);

    expect(onChange).toHaveBeenCalledWith(1);
    expect(activity).toHaveAttribute('aria-checked', 'true');
  });
});
