import { InputProps, SelectProps } from 'antd'
import { FormItemProps, Rule, RuleObject } from 'antd/es/form'
import { NamePath, StoreValue } from 'antd/es/form/interface'
import type { CountryIso2 , CountryData} from 'react-international-phone'

export type TCountryIso2 = CountryIso2
export type TParsedCountry = {
  name: CountryData[0];
  iso2: CountryData[1];
  dialCode: CountryData[2];
  format: CountryData[3];
  priority: CountryData[4];
  areaCodes: CountryData[5];

}
export type TRule = Rule
export type TRuleObject = RuleObject
export type TStoreValue = StoreValue

export type THandlePhoneNumber = (data: {
  phone: string
  inputValue: string
  country: TParsedCountry
}) => void

export type TPhoneInputProps = {
  name: NamePath
  countryFieldName?: string
  phoneFieldName?: string
  requiredErrorMessage?: string
  invalidErrorMessage?: string
  hideCountryName?: boolean
  selectProps?: SelectProps
  inputProps?: InputProps
} & FormItemProps

export type TPhoneInputHookArgs = {
  name: NamePath
  countryFieldName?: string
  phoneFieldName?: string
  requiredErrorMessage?: string
  invalidErrorMessage?: string
  required?: boolean
}

export type TCountryCodeSelector = {
  name: NamePath
  countryFieldName: string
  selectProps?: SelectProps
  initialValue?: CountryIso2
  hideCountryName?: boolean
}
