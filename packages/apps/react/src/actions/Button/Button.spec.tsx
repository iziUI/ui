import { render, screen, fireEvent } from '@testing-library/react';

import Button from './Button';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

jest.mock('@/actions/Ripple', () => ({
  __esModule: true,
  default: () => null,
}));

describe('Button', () => {
  it('renders children inside a button element', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies the base class', () => {
    render(<Button>X</Button>);
    expect(screen.getByRole('button')).toHaveClass('iziui-button');
  });

  it('merges additional className', () => {
    render(<Button className="custom">X</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('iziui-button');
    expect(btn).toHaveClass('custom');
  });

  describe('size prop', () => {
    it('applies medium class by default', () => {
      render(<Button>X</Button>);
      expect(screen.getByRole('button')).toHaveClass('iziui-button--medium');
    });

    it.each(['small', 'large'] as const)('applies %s size class', (size) => {
      render(<Button size={size}>X</Button>);
      expect(screen.getByRole('button')).toHaveClass(`iziui-button--${size}`);
    });
  });

  describe('color prop', () => {
    it('applies primary color class by default', () => {
      render(<Button>X</Button>);
      expect(screen.getByRole('button')).toHaveClass('iziui-button--primary');
    });

    it.each(['secondary', 'error', 'success', 'warning', 'info'] as const)(
      'applies %s color class',
      (color) => {
        render(<Button color={color}>X</Button>);
        expect(screen.getByRole('button')).toHaveClass(`iziui-button--${color}`);
      }
    );
  });

  describe('variant prop', () => {
    it('applies contained variant by default', () => {
      render(<Button>X</Button>);
      expect(screen.getByRole('button')).toHaveClass('iziui-button--primary--contained');
    });

    it.each(['outlined', 'text'] as const)('applies %s variant class', (variant) => {
      render(<Button variant={variant}>X</Button>);
      expect(screen.getByRole('button')).toHaveClass(`iziui-button--primary--${variant}`);
    });
  });

  describe('click behavior', () => {
    it('calls onClick when clicked', () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick}>X</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when loading is provided', () => {
      const onClick = jest.fn();
      render(
        <Button onClick={onClick} loading={<span data-testid="spinner" />}>
          X
        </Button>
      );
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when disabled', () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick} disabled>X</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('loading state', () => {
    it('renders the loading element instead of children', () => {
      render(
        <Button loading={<span data-testid="spinner" />}>
          Label
        </Button>
      );
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
      expect(screen.queryByText('Label')).not.toBeInTheDocument();
    });

    it('adds loading class to the provided loading element', () => {
      render(
        <Button loading={<span data-testid="spinner" />}>X</Button>
      );
      expect(screen.getByTestId('spinner')).toHaveClass('iziui-button__loading');
    });

    it('adds size-scoped loading class', () => {
      render(
        <Button size="small" loading={<span data-testid="spinner" />}>X</Button>
      );
      expect(screen.getByTestId('spinner')).toHaveClass('iziui-button__loading--small');
    });
  });

  describe('icons', () => {
    it('renders startIcon inside the button', () => {
      render(
        <Button startIcon={<span data-testid="start-icon" />}>Label</Button>
      );
      expect(screen.getByRole('button')).toContainElement(screen.getByTestId('start-icon'));
    });

    it('renders endIcon inside the button', () => {
      render(
        <Button endIcon={<span data-testid="end-icon" />}>Label</Button>
      );
      expect(screen.getByRole('button')).toContainElement(screen.getByTestId('end-icon'));
    });

    it('renders startIcon before label text in the DOM', () => {
      const { container } = render(
        <Button startIcon={<span data-testid="start-icon" />}>Label</Button>
      );
      const html = container.querySelector('button')!.innerHTML;
      expect(html.indexOf('start-icon')).toBeLessThan(html.indexOf('Label'));
    });

    it('renders endIcon after label text in the DOM', () => {
      const { container } = render(
        <Button endIcon={<span data-testid="end-icon" />}>Label</Button>
      );
      const html = container.querySelector('button')!.innerHTML;
      expect(html.indexOf('end-icon')).toBeGreaterThan(html.indexOf('Label'));
    });

    it('adds direction class to startIcon', () => {
      render(<Button startIcon={<span data-testid="start-icon" />}>X</Button>);
      expect(screen.getByTestId('start-icon')).toHaveClass('iziui-button__icon--left');
    });

    it('adds direction class to endIcon', () => {
      render(<Button endIcon={<span data-testid="end-icon" />}>X</Button>);
      expect(screen.getByTestId('end-icon')).toHaveClass('iziui-button__icon--right');
    });

    it('hides icons while loading', () => {
      render(
        <Button
          startIcon={<span data-testid="start-icon" />}
          endIcon={<span data-testid="end-icon" />}
          loading={<span data-testid="spinner" />}
        >
          Label
        </Button>
      );
      expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();
    });
  });

  describe('HTML attributes', () => {
    it('forwards type attribute', () => {
      render(<Button type="submit">X</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('forwards aria-label', () => {
      render(<Button aria-label="save">X</Button>);
      expect(screen.getByRole('button', { name: 'save' })).toBeInTheDocument();
    });

    it('forwards data attributes', () => {
      render(<Button data-testid="btn" data-foo="bar">X</Button>);
      expect(screen.getByTestId('btn')).toHaveAttribute('data-foo', 'bar');
    });

    it('applies disabled attribute', () => {
      render(<Button disabled>X</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
