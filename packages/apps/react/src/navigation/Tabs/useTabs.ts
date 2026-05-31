import { useEffect, useState } from 'react';

type UseTabs = [(index: number) => void, number]

export default function useTabs(current: number): UseTabs {
  const [_current, setCurrent] = useState(current);

  useEffect(() => { setCurrent(current); }, [current]);

  const setTab = (index: number) => { setCurrent(index); };

  return [
    setTab,
    _current,
  ];
}