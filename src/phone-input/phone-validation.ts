import { Rule, RuleObject } from 'antd/es/form'
import { StoreValue } from 'antd/es/form/interface'
import { PhoneNumberUtil } from 'google-libphonenumber'
import { CountryIso2 } from 'react-international-phone'

const phoneUtil = PhoneNumberUtil.getInstance()

export const phoneValidRule = (coutry: CountryIso2, msg: string): Rule => {
  return {
    validator: async (_: RuleObject, value: StoreValue) => {
      if (!value) return Promise.resolve()
      const number = phoneUtil.parseAndKeepRawInput(value, coutry.toUpperCase())
      if (!phoneUtil.isValidNumber(number))
        return Promise.reject(new Error(msg))
      return Promise.resolve()
    },
  }
}
