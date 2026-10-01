import { userEvent } from '@storybook/test';

import { act, fireEvent, render, screen } from '@/test/render';

import InputFile from './InputFile';

describe('InputFile', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows instructions and renders selected files with the supplied renderer', () => {
    jest.useFakeTimers();
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

    act(() => {
      jest.runOnlyPendingTimers();
    });
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

  it('activates its native picker once for Enter and Space', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <InputFile
        files={[]}
        placeholder="Drop a statement here"
        data-testid="file-input"
      />
    );

    const dropTarget = screen.getByRole('button', { name: 'Drop a statement here' });
    const nativeInput = screen.getByTestId('file-input');
    const click = jest.spyOn(nativeInput, 'click').mockImplementation();

    await user.tab();
    expect(dropTarget).toHaveFocus();

    await user.keyboard('{Enter} ');

    expect(click).toHaveBeenCalledTimes(2);
    click.mockRestore();

    act(() => {
      jest.runOnlyPendingTimers();
    });
  });

  it('announces its active error', () => {
    render(
      <InputFile
        error
        files={[]}
        helperText="Upload a PDF document"
        placeholder="Drop a statement here"
      />
    );

    const error = screen.getByRole('alert');

    expect(error).toHaveTextContent('Upload a PDF document');
    expect(error).toHaveAttribute('aria-live', 'assertive');
  });
});
