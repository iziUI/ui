import { act, fireEvent, render, screen } from '@testing-library/react';

import InputFile from './InputFile';

jest.mock('@/core/createComponent', () => ({
  __esModule: true,
  default: (Comp: any) => Comp,
}));

describe('InputFile', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows instructions and renders selected files with the supplied renderer', () => {
    const file = new File(['content'], 'statement.pdf', { type: 'application/pdf' });

    render(
      <InputFile
        files={[file]}
        placeholder="Drop a statement here"
        renderFiles={(files) => <p>{files[0].name}</p>}
      />
    );

    expect(screen.getByText('Drop a statement here')).toBeInTheDocument();
    expect(screen.getByText('statement.pdf')).toBeInTheDocument();
  });

  it('reports files selected through the native file input', () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const file = new File(['content'], 'statement.pdf', { type: 'application/pdf' });

    render(
      <InputFile
        files={[]}
        placeholder="Drop a statement here"
        onChange={onChange}
        data-testid="file-input"
      />
    );

    fireEvent.change(screen.getByTestId('file-input'), { target: { files: [file] } });
    expect(screen.getByText('Carregando...')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(onChange).toHaveBeenCalledWith([file]);
  });
});
