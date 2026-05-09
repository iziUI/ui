import { createContext, type PropsWithChildren, useMemo, useState } from 'react';

import { prefix } from '@iziui/tokens/web/js';

import { uuid } from '@iziui/toolkit/uuid';

import Zoom from '@/animations/Zoom';

import Toast, { type PickedToast } from './Toast';

import '@iziui/styles/components/Toast.scss';

export interface ToastContextConfig {
  toasts: Array<PickedToast>;
  add: (toast: PickedToast) => void;
}

export const ToastContext = createContext<ToastContextConfig>({
  toasts: [],
  add: () => { }
});

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Array<PickedToast>>([]);

  const context: ToastContextConfig = useMemo(() => ({
    toasts,
    add: (toast) => { addToast(toast); },
  }), [toasts]);

  const addToast = (toast: PickedToast) => {
    setToasts(prev => [...prev, { id: uuid(), visible: true, ...toast }]);
  };

  const remove = (id: string) => {
    setToasts(prev => prev.map(a => {
      if (a.id === id) { a.visible = false; }
      return a;
    }));
    setTimeout(() => { setToasts(prev => prev.filter(a => a.id !== id)); }, 500);
  };

  return (
    <ToastContext.Provider value={context}>
      <div className={`${prefix}-toast-container`}>
        {
          toasts.map(({ ...toast }) => {
            return (
              <div key={toast.id} style={{ marginBottom: 15 }}>
                <Zoom enter={Boolean(toast.visible)}>
                  <Toast {...toast} onRemove={remove} />
                </Zoom>
              </div>
            );
          })
        }
      </div>
      {children}
    </ToastContext.Provider>
  );
}