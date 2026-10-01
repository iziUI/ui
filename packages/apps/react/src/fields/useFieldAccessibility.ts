import { useId, type AriaAttributes } from 'react';

interface FieldAccessibilityOptions {
  id?: string;
  helperText?: string;
  error?: boolean;
  ariaDescribedBy?: string;
  ariaInvalid?: AriaAttributes['aria-invalid'];
}

export default function useFieldAccessibility({
  id,
  helperText,
  error,
  ariaDescribedBy,
  ariaInvalid,
}: FieldAccessibilityOptions) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const helperTextId = `${controlId}-helper-text`;
  const describedByIds = new Set(ariaDescribedBy?.split(/\s+/).filter(Boolean));

  if (helperText) {
    describedByIds.add(helperTextId);
  }

  return {
    controlId,
    helperTextId,
    describedBy: describedByIds.size ? Array.from(describedByIds).join(' ') : undefined,
    ariaInvalid: error ? true : ariaInvalid,
  };
}
