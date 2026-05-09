import { render, screen } from '@testing-library/react';

import Container from './Container';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('Container', () => {
  it('should render children', () => {
    render(
      <Container data-testid="container">
        Conteúdo renderizado
      </Container>
    );

    const el = screen.getByTestId('container');
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent('Conteúdo renderizado');
  });

  it('should apply base class and additional className', () => {
    render(
      <Container data-testid="container" className="custom-class">
        X
      </Container>
    );

    const el = screen.getByTestId('container');
    expect(el).toHaveClass('iziui-container');
    expect(el).toHaveClass('custom-class');
  });
});
