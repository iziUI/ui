import { render } from '@testing-library/react';

import Stack from './Stack';

describe('Stack', () => {
  it('Deve renderizar corretamente o componente', () => {
    const { getByTestId } = render(
      <Stack data-testid="stack">Conteúdo renderizado</Stack>
    );

    const element = getByTestId('stack');

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Conteúdo renderizado');
  });

  it('Aplica classes adicionais corretamente', () => {
    const { getByTestId } = render(
      <Stack
        flexDirection="row"
        className="custom-class"
        data-testid="stack"
      >
        Conteúdo renderizado
      </Stack>
    );

    const element = getByTestId('stack');

    expect(element).toHaveClass('iziui-stack');
    expect(element).toHaveClass('custom-class');
  });
});