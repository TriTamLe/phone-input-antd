import type { TCountryIso2 } from '../types';

import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

import { PHONE_NUMBER_SIMPLE_REGEX } from '../constants';

const phoneUtil = PhoneNumberUtil.getInstance();
const PNF = PhoneNumberFormat;

export const transformToE164format = (phone: string, country: TCountryIso2) => {
  if (!phone) return;
  const number = phoneUtil.parseAndKeepRawInput(phone, country.toUpperCase());

  return phoneUtil.format(number, PNF.E164);
};

export const extractToGetCountryCode = (value: string): TCountryIso2 | undefined => {
  let defaultCountryCode = undefined;

  if (!value) return defaultCountryCode;
  if (!PHONE_NUMBER_SIMPLE_REGEX.test(value)) return;

  try {
    const number = phoneUtil.parseAndKeepRawInput(value);

    defaultCountryCode = phoneUtil.getRegionCodeForNumber(number)?.toLowerCase();
  } catch (e) {
    return;
  }

  return defaultCountryCode;
};

export const extractToGetNationalNumber = (value: string): string | undefined => {
  let nationalNumber = undefined;

  if (!value) return nationalNumber;
  if (!PHONE_NUMBER_SIMPLE_REGEX.test(value)) return;

  try {
    const number = phoneUtil.parseAndKeepRawInput(value);

    nationalNumber = phoneUtil.getNationalSignificantNumber(number);
  } catch (e) {
    return;
  }

  return nationalNumber;
};
