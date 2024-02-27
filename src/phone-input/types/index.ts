import type { DEFAULT_COUNTRY_FIELD_NAME, DEFAULT_PHONE_FIELD_NAME } from '@/components/phone-input/constants';
import type { InputProps, SelectProps } from 'antd';
import type { FormItemProps, Rule, RuleObject } from 'antd/es/form';
import type { NamePath, StoreValue } from 'antd/es/form/interface';
import type { CountryData, CountryIso2 } from 'react-international-phone';

export type TCountryIso2 = CountryIso2;
export type TCountryData = CountryData;
export type TParsedCountry = {
  name: CountryData[0];
  iso2: CountryData[1];
  dialCode: CountryData[2];
  format: CountryData[3];
  priority: CountryData[4];
  areaCodes: CountryData[5];
};
export type TRule = Rule;
export type TRuleObject = RuleObject;
export type TStoreValue = StoreValue;

export type THandlePhoneNumber = (data: { phone: string; inputValue: string; country: TParsedCountry }) => void;

export type TPhoneInputProps = {
  parentName?: NamePath;
  name: NamePath;
  countryFieldName?: NamePath;
  phoneFieldName?: NamePath;
  requiredErrorMessage?: string;
  invalidErrorMessage?: string;
  showCountryName?: boolean;
  selectProps?: SelectProps;
  inputProps?: InputProps;
} & FormItemProps;

export type TPhoneInputHookArgs = {
  inputLogicName: NamePath;
  countryLogicName: NamePath;
  requiredErrorMessage?: string;
  invalidErrorMessage?: string;
  required?: boolean;
  rules?: TRule[];
};

export type TCountryCodeSelector = {
  name: NamePath;
  selectProps?: SelectProps;
  initialValue?: CountryIso2;
  showCountryName?: boolean;
  className?: string;
};

export type TPhoneObject = {
  [DEFAULT_COUNTRY_FIELD_NAME]: TCountryIso2;
  [DEFAULT_PHONE_FIELD_NAME]: string;
};
