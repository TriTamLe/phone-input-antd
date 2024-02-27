import type { THandlePhoneNumber } from '../types';
import type { FormInstance } from 'antd';
import type { NamePath } from 'antd/es/form/interface';

export const onInputChangeFn =
  (value: string, form: FormInstance, fieldToReset: NamePath): THandlePhoneNumber =>
  ({ country }) => {
    if (!value) return;
    if (value[0] !== '+') return;
    form.setFieldValue(fieldToReset, country.iso2);
  };
