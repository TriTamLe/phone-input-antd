import { PHONE_REQUIRED_MSG } from '../constants'
import { phoneValidRule, requiredRule } from '../handlers'
import { TCountryIso2, TRule } from '../types'

export const useGetPhoneRule = (
  country: TCountryIso2,
  isRequired = false,
  requiredErrorMessage = PHONE_REQUIRED_MSG,
  invalidErrorMessage = PHONE_REQUIRED_MSG
): TRule[] => {
  return isRequired
    ? [
        requiredRule(requiredErrorMessage),
        phoneValidRule(country, invalidErrorMessage),
      ]
    : [{ required: false }, phoneValidRule(country, invalidErrorMessage)]
}
