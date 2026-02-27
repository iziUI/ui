import useFormGroup from './useFormGroup';

export default function useControl<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T,
>(controlName: K) {
  const formGroup = useFormGroup<T>();
  const control = formGroup.controls[controlName];

  const update = (value: T[K]) => {
    console.log('>>> update', value);
    control.value = value;

    formGroup.setValues((data) => {
      data[controlName] = value;

      return data;
    });
  };

  return { control, update };
}