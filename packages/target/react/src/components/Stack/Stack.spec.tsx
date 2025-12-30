import React from 'react';

import { render, screen } from '@testing-library/react';

import Stack from './Stack';

// Mock do wrapper createComponent para não depender de implementação interna
jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Stack', () => {
  it('should render children', () => {
    render(
      <Stack data-testid="stack">
        Conteúdo renderizado
      </Stack>
    );

    const el = screen.getByTestId('stack');
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent('Conteúdo renderizado');
  });

  it('should apply base class and additional className', () => {
    render(
      <Stack data-testid="stack" className="custom-class">
        X
      </Stack>
    );

    const el = screen.getByTestId('stack');
    expect(el).toHaveClass('iziui-stack');
    expect(el).toHaveClass('custom-class');
  });

  it('should render using a custom tag', () => {
    render(
      <Stack data-testid="stack" tag="section">
        X
      </Stack>
    );

    const el = screen.getByTestId('stack');
    expect(el.tagName.toLowerCase()).toBe('section');
  });

  it('should apply default layout styles', () => {
    render(
      <Stack data-testid="stack">
        X
      </Stack>
    );

    const el = screen.getByTestId('stack');

    // defaults
    expect(el).toHaveStyle({
      gap: '16px',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    });
  });

  it('should apply custom layout props as styles', () => {
    render(
      <Stack
        data-testid="stack"
        gap={8}
        flexWrap="wrap"
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        alignSelf="stretch"
      >
        X
      </Stack>
    );

    const el = screen.getByTestId('stack');

    expect(el).toHaveStyle({
      gap: '8px',
      flexWrap: 'wrap',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
    });
  });

  it('should merge style prop and let props.style override internal style values', () => {
    render(
      <Stack
        data-testid="stack"
        gap={10}
        style={{
          gap: 32, // override
          marginTop: 12, // additional style
        }}
      >
        X
      </Stack>
    );

    const el = screen.getByTestId('stack');

    // style do usuário deve vencer (spread por último)
    expect(el).toHaveStyle({
      gap: '32px',
      marginTop: '12px',
    });
  });

  it('should forward ref to the rendered element', () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Stack ref={ref} data-testid="stack">
        X
      </Stack>
    );

    const el = screen.getByTestId('stack');
    expect(ref.current).toBe(el);
  });

  it('should pass through HTML attributes', () => {
    render(
      <Stack
        data-testid="stack"
        id="my-stack"
        aria-label="stack"
        data-foo="bar"
      >
        X
      </Stack>
    );

    const el = screen.getByTestId('stack');
    expect(el).toHaveAttribute('id', 'my-stack');
    expect(el).toHaveAttribute('aria-label', 'stack');
    expect(el).toHaveAttribute('data-foo', 'bar');
  });
});