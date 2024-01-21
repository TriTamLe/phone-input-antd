import { PhoneNumberUtil } from 'google-libphonenumber'
import { TCountryIso2, TRule, TRuleObject, TStoreValue } from '../types'

const phoneUtil = PhoneNumberUtil.getInstance()

export const hasValue = (value: TStoreValue): boolean => {
  return value !== undefined && value.trim() !== ''
}
export const requiredRule = (msg: string, condition: boolean = true): TRule => {
  return {
    validator: (_: TRuleObject, value: TStoreValue) => {
      const val = typeof value === 'string' ? value.trim() : value
      const valid = !!(Array.isArray(val)
        ? val.length
        : !(typeof val === 'undefined' || val === null || val === ''))

      return condition && valid
        ? Promise.resolve()
        : Promise.reject(new Error(msg))
    },
  }
}

export const phoneValidRule = (coutry: TCountryIso2, msg: string): TRule => {
  return {
    validator: async (_: TRuleObject, value: TStoreValue) => {
      if (!value) return Promise.resolve()
      const number = phoneUtil.parseAndKeepRawInput(value, coutry.toUpperCase())
      if (!phoneUtil.isValidNumber(number))
        return Promise.reject(new Error(msg))
      return Promise.resolve()
    },
  }
}
