import type { TPhoneInputHookArgs } from '../types';
import type { InputRef } from 'antd';

import { useWatch } from 'antd/es/form/Form';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';
import { useRef } from 'react';
import { usePhoneInput } from 'react-international-phone';

import { DEFAULT_COUNTRY_CODE, DIAL_CODE_PREFIX, PHONE_INVALID_MSG, PHONE_REQUIRED_MSG } from '../constants';
import { onInputChangeFn } from '../handlers';
import { useGetPhoneRule } from './use-get-phone-rule';

export const usePhoneInputField = ({
  inputLogicName,
  countryLogicName,
  requiredErrorMessage = PHONE_REQUIRED_MSG,
  invalidErrorMessage = PHONE_INVALID_MSG,
  required,
  rules,
}: TPhoneInputHookArgs) => {
  const form = useFormInstance();
  const inputRef = useRef<InputRef>(null);
  const inputValue = useWatch(inputLogicName, form);
  const countryISO2 = useWatch(countryLogicName, form);
  const initialCountryISO2 = form.getFieldValue(countryLogicName) ?? DEFAULT_COUNTRY_CODE;

  const phoneRules = useGetPhoneRule({
    country: countryISO2,
    isRequired: required || false,
    requiredErrorMessage,
    invalidErrorMessage,
    additionalRules: rules,
  });

  usePhoneInput({
    defaultCountry: DEFAULT_COUNTRY_CODE,
    prefix: DIAL_CODE_PREFIX,
    value: inputValue,
    disableDialCodePrefill: true,
    // disableCountryGuess: true,
    onChange: onInputChangeFn(inputValue, form, countryLogicName),
  });

  return {
    inputRef,
    initialCountryISO2,
    phoneRules,
  };
};
