import { InputRef } from 'antd'
import { useWatch } from 'antd/es/form/Form'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { useRef } from 'react'
import { usePhoneInput } from 'react-international-phone'
import {
  DEFAULT_COUNTRY_CODE,
  DEFAULT_COUNTRY_FIELD_NAME,
  DEFAULT_PHONE_FIELD_NAME,
  DIAL_CODE_PREFIX,
  PHONE_INVALID_MSG,
  PHONE_REQUIRED_MSG,
} from '../constants'
import { getFunctionOnInputChange } from '../handlers'
import { TPhoneInputHookArgs } from '../types'
import { useGetPhoneRule } from './use-get-phone-rule'

export const usePhoneInputField = ({
  name,
  countryFieldName = DEFAULT_COUNTRY_FIELD_NAME,
  phoneFieldName = DEFAULT_PHONE_FIELD_NAME,
  requiredErrorMessage = PHONE_REQUIRED_MSG,
  invalidErrorMessage = PHONE_INVALID_MSG,
  required,
}: TPhoneInputHookArgs) => {
  const form = useFormInstance()
  const inputRef = useRef<InputRef>(null)
  const inputValue = useWatch([name, phoneFieldName], form)
  const countryISO2 = useWatch([name, countryFieldName], form)
  const initialCountryISO2 =
    form.getFieldValue([name, countryFieldName]) ?? DEFAULT_COUNTRY_CODE
  const phoneRules = useGetPhoneRule(
    countryISO2,
    required,
    requiredErrorMessage,
    invalidErrorMessage
  )

  usePhoneInput({
    defaultCountry: DEFAULT_COUNTRY_CODE,
    prefix: DIAL_CODE_PREFIX,
    value: inputValue,
    disableDialCodePrefill: true,
    onChange: getFunctionOnInputChange(inputValue, form, [
      name,
      countryFieldName,
    ]),
  })

  return {
    inputRef,
    initialCountryISO2,
    phoneRules,
  }
}
