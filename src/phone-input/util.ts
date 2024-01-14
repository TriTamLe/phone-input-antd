import { FormInstance } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'
import {
  CountryIso2,
  ParsedCountry,
} from '../../node_modules/react-international-phone/build/types'

const phoneUtil = PhoneNumberUtil.getInstance()
const PNF = PhoneNumberFormat

type THandlePhoneNumber = (data: {
  phone: string
  inputValue: string
  country: ParsedCountry
}) => void

export const getFunctionOnInputChange =
  (
    value: string,
    form: FormInstance,
    fieldToReset: NamePath
  ): THandlePhoneNumber =>
  ({ country }) => {
    if (!value) return
    if (value[0] !== '+') return
    form.setFieldValue(fieldToReset, country)
  }

export const transformToE164format = (phone: string, country: CountryIso2) => {
  if (!phone) return
  const number = phoneUtil.parseAndKeepRawInput(phone, country.toUpperCase())

  return phoneUtil.format(number, PNF.E164)
}
