import { render, screen } from '@testing-library/react';

import Container from './Container';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

jest.mock('@/hooks/useResize', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Container', () => {
  it('renders children in its configured semantic element', () => {
    render(
      <Container tag="main" aria-label="Page content">
        Rendered content
      </Container>
    );

    expect(screen.getByRole('main', { name: 'Page content' })).toHaveTextContent('Rendered content');
  });

  it('preserves caller-provided layout constraints', () => {
    render(
      <Container tag="section" aria-label="Results" style={{ maxWidth: '48rem' }}>
        Results
      </Container>
    );

    expect(screen.getByRole('region', { name: 'Results' })).toHaveStyle({ maxWidth: '48rem' });
  });
});
