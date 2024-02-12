//*--simple check for phone number
//*---maximum 15 digits
//*---contains only digits, spaces, dots and hyphens
//*---must start with a digit or a plus
//*---must not end with a space
//*---this regex makes sure that the input can be parsed to a phoneNumber object
export const PHONE_NUMBER_SIMPLE_REGEX = /^\+?(\d{2,3})(\s|\d|-|\.){1,15}$/
