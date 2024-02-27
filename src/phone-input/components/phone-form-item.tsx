import type { TPhoneInputProps } from '../types';

import 'react-international-phone/style.css';

import { Input } from 'antd';
import Form from 'antd/es/form';

import {
  DEFAULT_COUNTRY_FIELD_NAME,
  DEFAULT_PHONE_FIELD_NAME,
  PHONE_INVALID_MSG,
  PHONE_REQUIRED_MSG,
} from '../constants';
import { mergeNamePath } from '../handlers';
import { usePhoneInputField } from '../hooks';
import { CountryCodeSelector } from './country-code-selector';

export const PhoneFormItem = ({
  name,
  countryFieldName = DEFAULT_COUNTRY_FIELD_NAME,
  phoneFieldName = DEFAULT_PHONE_FIELD_NAME,
  requiredErrorMessage = PHONE_REQUIRED_MSG,
  invalidErrorMessage = PHONE_INVALID_MSG,
  showCountryName = false,
  selectProps,
  inputProps,
  required,
  parentName = [],
  ...props
}: TPhoneInputProps) => {
  const inputName = mergeNamePath(name, phoneFieldName);
  const inputLogicName = mergeNamePath(parentName, name, phoneFieldName);
  const countryName = mergeNamePath(name, countryFieldName);
  const countryLogicName = mergeNamePath(parentName, name, countryFieldName);

  const { inputRef, initialCountryISO2, phoneRules } = usePhoneInputField({
    inputLogicName,
    countryLogicName,
    requiredErrorMessage,
    invalidErrorMessage,
    required,
    rules: props.rules,
  });

  return (
    <Form.Item name={inputName} rules={phoneRules} dependencies={[countryLogicName]} required {...props}>
      <Input
        prefix={
          <CountryCodeSelector
            name={countryName}
            selectProps={selectProps}
            showCountryName={showCountryName}
            initialValue={initialCountryISO2}
          />
        }
        ref={inputRef}
        type="tel"
        style={{ height: '48px' }}
        {...inputProps}
      />
    </Form.Item>
  );
};
