import { Children, cloneElement, ReactElement, useEffect, useMemo, useRef, useState } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { joinClass } from '@iziui/core/utils';
import { Colors } from '@iziui/core/theme';

import { uuid } from '@iziui/toolkit/uuid';

import createComponent from '@/core/createComponent';
import useListenerResized from '@/hooks/useListenerResized';

import '@iziui/styles/components/Tabs.scss';

function validateCurrent(length: number, current: number) {
  if (current > length) {
    throw new Error(`Current tab index (${current}) is greater than the number of tabs (${length})`);
  }
}

export interface TabsProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onChange'> {
  current?: number;
  color?: Colors;
  children: React.ReactNode;
  onChange?: (index: number) => void;
};

function Tabs({
  children,
  color = 'primary',
  current = 0,
  onChange,
  ...props
}: TabsProps) {
  const arrayChildren = Children.toArray(children) as ReactElement<TabsProps>[];

  const [_current, setCurrent] = useState(current);
  const scrollRef = useRef<HTMLDivElement[] | null>([]);

  const cls = joinClass(
    `${prefix}-tabs`,
    `${prefix}-tabs--${color}`,
    props.className
  );

  const classNameMarker = joinClass(
    `${prefix}-tabs__marker`,
    `${prefix}-tabs__marker--${color}`,
  );

  const id = useMemo(() => `marker-${uuid()}`, []);

  useListenerResized(() => setBorderLine(), [_current]);

  useEffect(() => { validateCurrent(arrayChildren.length - 1, _current); }, []);

  useEffect(() => {
    const firstEnableButton = arrayChildren.findIndex(children => !children.props.disabled);
    const currentIsDisabled = arrayChildren[current].props.disabled;

    setCurrent(currentIsDisabled ? firstEnableButton : current);
  }, [current]);

  useEffect(() => {
    setBorderLine();
    goToTab(_current);
  }, [_current]);

  const handleClick = (index: number) => {
    if (onChange) { onChange(index); };
    setCurrent(index);
  };

  const goToTab = (index: number) => {
    if (!scrollRef.current) { return; }
    scrollRef.current[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center', });
  };

  const setRef = (index: number, ref: HTMLDivElement | null) => {
    if (!scrollRef.current || !ref) { return; }

    scrollRef.current[index] = ref;
  };

  const setBorderLine = () => {
    const element = document.querySelector(`#tab-${id}-${_current}`) as HTMLElement;
    const el = document.getElementById(id) as HTMLElement;

    const width = element['offsetWidth'];
    const left = element['offsetLeft'];

    el.style.width = `${width}px`;
    el.style.left = `${left}px`;
  };

  const renderChildren = () => {
    return arrayChildren.map((child, index) => {
      const _id = `tab-${id}-${index}`;
      const isActive = _current === index;

      return (
        <div key={_id} ref={ref => setRef(index, ref)} style={{ width: '100%' }}>
          {
            cloneElement(child, {
              id: _id,
              tabIndex: index + 1,
              'aria-checked': isActive,
              onClick: () => handleClick(index),
            })
          }
        </div>
      );
    });
  };

  return (
    <div {...props} className={cls}>
      {renderChildren()}
      <div id={id} className={classNameMarker} />
    </div>
  );
}

export default createComponent(Tabs);
