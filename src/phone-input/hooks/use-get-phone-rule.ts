import type { TCountryIso2, TRule } from '../types';

import { PHONE_REQUIRED_MSG } from '../constants';
import { phoneValidRule, requiredRule } from '../handlers';

type TGetRulesArg = {
  country: TCountryIso2;
  isRequired?: boolean;
  requiredErrorMessage?: string;
  invalidErrorMessage?: string;
  additionalRules?: TRule[];
};

export const useGetPhoneRule = ({
  country,
  isRequired = false,
  requiredErrorMessage = PHONE_REQUIRED_MSG,
  invalidErrorMessage = PHONE_REQUIRED_MSG,
}: TGetRulesArg): TRule[] => {
  const rules = [phoneValidRule(country, invalidErrorMessage)];

  return isRequired ? [requiredRule(requiredErrorMessage), ...rules] : [{ required: false }, ...rules];
};
