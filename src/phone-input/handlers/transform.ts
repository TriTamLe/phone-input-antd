import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'
import { TCountryIso2 } from '../types'

const phoneUtil = PhoneNumberUtil.getInstance()
const PNF = PhoneNumberFormat

export const transformToE164format = (phone: string, country: TCountryIso2) => {
  if (!phone) return
  const number = phoneUtil.parseAndKeepRawInput(phone, country.toUpperCase())

  return phoneUtil.format(number, PNF.E164)
}
