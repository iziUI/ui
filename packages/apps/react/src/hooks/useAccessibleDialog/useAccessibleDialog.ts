import { useEffect, useRef, type KeyboardEvent } from 'react';

interface UseAccessibleDialogOptions {
  open: boolean;
  onClose: () => void;
  restoreAfterClose: boolean;
}

const focusableSelector = [
  'a[href]',
  'button:not(:disabled)',
  'input:not([type="hidden"]):not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(dialog: HTMLElement) {
  return Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => element.getAttribute('aria-disabled') !== 'true'
  );
}

function canRestoreFocus(element: HTMLElement) {
  return element.isConnected
    && !element.matches(':disabled')
    && element.getAttribute('aria-disabled') !== 'true'
    && element.tabIndex >= 0;
}

export default function useAccessibleDialog({ open, onClose, restoreAfterClose }: UseAccessibleDialogOptions) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) { return; }

    previouslyFocusedElement.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

    const dialog = dialogRef.current;

    if (!dialog) { return; }

    (getFocusableElements(dialog)[0] ?? dialog).focus();
  }, [open]);

  useEffect(() => {
    const element = previouslyFocusedElement.current;

    if (!restoreAfterClose || !element || !canRestoreFocus(element)) { return; }

    element.focus();
    previouslyFocusedElement.current = null;
  }, [restoreAfterClose]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented) { return; }

    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab') { return; }

    const dialog = dialogRef.current;

    if (!dialog) { return; }

    const focusableElements = getFocusableElements(dialog);

    if (!focusableElements.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1)!;
    const activeElement = document.activeElement;

    if (event.shiftKey && (activeElement === firstElement || !dialog.contains(activeElement))) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && (activeElement === lastElement || !dialog.contains(activeElement))) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return { dialogRef, onKeyDown };
}
