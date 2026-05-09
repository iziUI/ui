import type { InputHTMLAttributes } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '@/core';

import '@iziui/styles/components/InputFile.scss';

export interface InputFileProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

function InputFile({ ...props }: InputFileProps) {
  const cls = joinClass(
    `${prefix}-input-file`,
    props.className
  );

  return (
    <input {...props} type="file" className={cls} />
  );
}

export default createComponent(InputFile);
