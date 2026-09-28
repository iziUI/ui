import { CSSProperties } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils/joinClass';

import createComponent from '../../core/createComponent';

import '@iziui/styles/components/Skeleton.scss';

export type SkeletonVariant = 'rounded' | 'rectangular' | 'circular';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width: CSSProperties['width'];
  height: CSSProperties['height'];
}

function Skeleton({ width, height, variant = 'rounded' }: SkeletonProps) {
  const className = joinClass(
    `${prefix}-skeleton`,
    `${prefix}-skeleton--${variant}`
  );

  return (
    <div className={className} style={{ width, height }} />
  );
}

export default createComponent(Skeleton);
