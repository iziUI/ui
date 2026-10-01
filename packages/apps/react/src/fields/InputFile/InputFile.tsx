import {
  useRef,
  useMemo,
  useState,
  type DragEvent,
  type ChangeEvent,
  type KeyboardEvent,
  type InputHTMLAttributes
} from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import { wait } from '@iziui/toolkit/promise';

import Stack from '@/layout/Stack';
import Zoom from '@/animations/Zoom';
import Icon from '@/display/Icon/Icon';
import Slide from '@/animations/Slide';
import Loading from '@/feedback/Loading';
import Typography from '@/display/Typography';
import createComponent from '@/core/createComponent';

import '@iziui/styles/components/InputFile.scss';

type State = 'empty' | 'dragging' | 'loading';

export interface InputFileProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  files: File[];
  error?: boolean;
  success?: boolean;
  helperText?: string;
  onChange?: (files: File[]) => void;
  renderFiles?: (files: File[]) => React.JSX.Element;
}

function InputFile({
  files,
  error,
  success,
  helperText,
  placeholder,
  renderFiles,
  onChange,
  ...props
}: InputFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<State>('empty');

  const isFilled = useMemo(
    () => !props.multiple && files.length > 0,
    [files, props.multiple]
  );
  const triggerAttributes = useMemo(() => {
    const isEmpty = state === 'empty';

    return {
      tabIndex: props.disabled ? -1 : 0,
      ariaLabel: props['aria-label'] ?? placeholder,
      ariaDisabled: props.disabled || undefined,
      iconColor: isEmpty ? 'grey' : 'primary',
      textColor: isEmpty ? 'text.secondary' : 'primary.main',
    } as const;
  }, [placeholder, props.disabled, props['aria-label'], state]);

  const classes = joinClass(
    `${prefix}-input-file`,
    error && `${prefix}-input-file--error`,
    success && state !== 'loading' && `${prefix}-input-file--success`,
    state === 'dragging' && !isFilled && `${prefix}-input-file--dragging`,
    props.className
  );

  const processFiles = (newFiles: File[]) => {
    if (!newFiles.length) {
      setState('empty');
      return;
    }

    setState('loading');

    wait(() => {
      if (onChange) {
        onChange(props.multiple ? [...files, ...newFiles] : newFiles);
      }
      setState('empty');
    }, 1500);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];

    if (inputRef.current) { inputRef.current.value = ''; }

    processFiles(newFiles);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState('dragging');
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState('empty');
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    processFiles(Array.from(e.dataTransfer.files));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (props.disabled || (e.key !== 'Enter' && e.key !== ' ')) { return; }
    if (!inputRef.current) { return; }

    e.preventDefault();
    inputRef.current.click();
  };

  return (
    <Stack>
      <div
        className={classes}
        role="button"
        tabIndex={triggerAttributes.tabIndex}
        aria-label={triggerAttributes.ariaLabel}
        aria-disabled={triggerAttributes.ariaDisabled}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={handleKeyDown}
      >
        <input
          {...props}
          ref={inputRef}
          type="file"
          onChange={handleChange}
        />
        <Stack justifyContent="center" alignItems="center">
          {
            state === 'loading' && !error && (
              <Slide enter direction="top" style={{ textAlign: 'center' }}>
                <Loading style={{ fontSize: 42 }} />
                <Typography variant="body2" color="primary.main">
                  Carregando...
                </Typography>
              </Slide>
            )
          }
          {
            state !== 'loading' && !success && !error && (
              <Slide enter direction="top" style={{ textAlign: 'center' }}>
                <Icon
                  name="cloud-upload"
                  color={triggerAttributes.iconColor}
                  style={{ fontSize: 42 }}
                />
                <Typography
                  color={triggerAttributes.textColor}
                  variant="body2"
                >
                  {placeholder}
                </Typography>
              </Slide>
            )
          }
          {
            state !== 'loading' && success && !error && (
              <Zoom enter style={{ textAlign: 'center' }}>
                <Stack gap={0} alignItems="center">
                  <Icon
                    color="success"
                    name="check-circle"
                    style={{ fontSize: 42 }}
                  />
                  <Typography color="success.main">{helperText}</Typography>
                </Stack>
              </Zoom>
            )
          }
          {
            error && (
              <Zoom enter style={{ textAlign: 'center' }}>
                <Stack gap={0} alignItems="center">
                  <Icon
                    color="error"
                    name="exclamation-octagon"
                    style={{ fontSize: 42 }}
                  />
                  <Typography role="alert" aria-live="assertive" color="error.main">{helperText}</Typography>
                </Stack>
              </Zoom>
            )
          }
        </Stack>
      </div>
      {renderFiles && renderFiles(files)}
    </Stack>
  );
}

export default createComponent(InputFile);
