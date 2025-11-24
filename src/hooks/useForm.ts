import { useState, useCallback } from 'react';

interface FormErrors {
  [key: string]: string | null;
}

export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: Partial<Record<keyof T, (value: any) => string | null>>
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );

  const handleChange = useCallback(
    (field: keyof T) => (value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      if (validationSchema && validationSchema[field]) {
        const error = validationSchema[field]!(value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [validationSchema]
  );

  const handleBlur = useCallback(
    (field: keyof T) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    if (!validationSchema) return true;

    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach((key) => {
      const field = key as keyof T;
      const validator = validationSchema[field];
      if (validator) {
        const error = validator(values[field]);
        if (error) {
          newErrors[field as string] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validationSchema]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({} as Record<keyof T, boolean>);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
  };
};
