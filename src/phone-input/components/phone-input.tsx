import { Input, Space } from 'antd'
import Form from 'antd/es/form'
import 'react-international-phone/style.css'

import {
  DEFAULT_COUNTRY_FIELD_NAME,
  DEFAULT_PHONE_FIELD_NAME,
  PHONE_INVALID_MSG,
  PHONE_REQUIRED_MSG,
} from '../constants'
import { usePhoneInputField } from '../hooks'
import { TPhoneInputProps } from '../types'
import { CountryCodeSelector } from './select-country-code'

export const PhoneInputField = ({
  name,
  countryFieldName = DEFAULT_COUNTRY_FIELD_NAME,
  phoneFieldName = DEFAULT_PHONE_FIELD_NAME,
  requiredErrorMessage = PHONE_REQUIRED_MSG,
  invalidErrorMessage = PHONE_INVALID_MSG,
  hideCountryName = false,
  selectProps,
  inputProps,
  required,
  ...props
}: TPhoneInputProps) => {
  const { inputRef, initialCountryISO2, phoneRules } = usePhoneInputField({
    name,
    countryFieldName,
    phoneFieldName,
    requiredErrorMessage,
    invalidErrorMessage,
    required,
  })

  return (
    <Form.Item required {...props}>
      <Space.Compact>
        <CountryCodeSelector
          name={name}
          countryFieldName={countryFieldName}
          selectProps={selectProps}
          initialValue={initialCountryISO2}
          hideCountryName={hideCountryName}
        />
        <Form.Item
          name={[name, phoneFieldName]}
          rules={phoneRules}
          className='m-0'>
          <Input ref={inputRef} type='tel' size='large' {...inputProps} />
        </Form.Item>
      </Space.Compact>
    </Form.Item>
  )
}
