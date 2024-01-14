import {
  FormItemProps,
  Input,
  InputProps,
  InputRef,
  Select,
  SelectProps,
  Space,
} from 'antd'
import Form, { Rule } from 'antd/es/form'
import { useWatch } from 'antd/es/form/Form'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'
import { useEffect, useRef } from 'react'
import {
  CountryIso2,
  FlagImage,
  defaultCountries,
  usePhoneInput,
} from 'react-international-phone'
import 'react-international-phone/style.css'

import { NamePath } from 'antd/es/form/interface'
import {
  DEFAULT_COUNTRY_CODE,
  DEFAULT_COUNTRY_FIELD_NAME,
  DEFAULT_PHONE_FIELD_NAME,
  DIAL_CODE_PREFIX,
  PHONE_INVALID_MSG,
  PHONE_REQUIRED_MSG,
} from './constants'
import { phoneValidRule } from './phone-validation'
import { requiredRule } from './required-validation'
import { getFunctionOnInputChange } from './util'

export type TPhoneInputProps = {
  name: NamePath
  countryFieldName?: string
  phoneFieldName?: string
  requiredErrorMessage?: string
  invalidErrorMessage?: string
  selectProps?: SelectProps
  inputProps?: InputProps
} & FormItemProps

export const PhoneInputField = ({
  name,
  countryFieldName = DEFAULT_COUNTRY_FIELD_NAME,
  phoneFieldName = DEFAULT_PHONE_FIELD_NAME,
  requiredErrorMessage = PHONE_REQUIRED_MSG,
  invalidErrorMessage = PHONE_INVALID_MSG,
  selectProps,
  inputProps,
  required,
  ...props
}: TPhoneInputProps) => {
  const form = useFormInstance()
  const inputRef = useRef<InputRef>(null)
  const inputValue = useWatch([name, phoneFieldName], form)
  const country = useWatch([name, countryFieldName], form)
  const phoneRules: Rule[] = required
    ? [
        requiredRule(requiredErrorMessage),
        phoneValidRule(country, invalidErrorMessage),
      ]
    : [{ required: false }, phoneValidRule(country, invalidErrorMessage)]

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

  useEffect(() => {
    form.validateFields([[name, phoneFieldName]])
  }, [country, form, name, phoneFieldName])

  return (
    <Form.Item required {...props}>
      <Space.Compact>
        <Form.Item
          name={[name, countryFieldName]}
          initialValue={
            form.getFieldValue([name, countryFieldName]) ?? DEFAULT_COUNTRY_CODE
          }>
          <Select size='large' {...selectProps}>
            {defaultCountries.map((countryData) => {
              const countryName = countryData[0]
              const iso2: CountryIso2 = countryData[1]
              const dialCode = countryData[2]

              return (
                <Select.Option value={iso2} key={iso2}>
                  <span className='flex flex-row gap-2 items-center'>
                    <FlagImage iso2={iso2} size={30} />
                    <span>{`${DIAL_CODE_PREFIX}${dialCode}`}</span>
                    <span>{countryName}</span>
                  </span>
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item name={[name, phoneFieldName]} rules={phoneRules}>
          <Input ref={inputRef} type='tel' size='large' {...inputProps} />
        </Form.Item>
      </Space.Compact>
    </Form.Item>
  )
}
