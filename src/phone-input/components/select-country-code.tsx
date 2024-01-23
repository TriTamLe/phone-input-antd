import { Form, Select } from 'antd'
import { FlagImage, defaultCountries } from 'react-international-phone'
import { DIAL_CODE_PREFIX } from '..'
import { TCountryCodeSelector, TCountryIso2 } from '../types'

export const CountryCodeSelector = ({
  name,
  countryFieldName,
  selectProps,
  initialValue,
  hideCountryName = false,
}: TCountryCodeSelector) => {
  return (
    <Form.Item name={[name, countryFieldName]} initialValue={initialValue}>
      <Select size='large' {...selectProps}>
        {defaultCountries.map((countryData) => {
          const countryName = countryData[0]
          const iso2: TCountryIso2 = countryData[1]
          const dialCode = countryData[2]

          return (
            <Select.Option value={iso2} key={iso2}>
              <span className='flex flex-row gap-2 items-center'>
                <FlagImage iso2={iso2} size={30} />
                <span>{`${DIAL_CODE_PREFIX}${dialCode}`}</span>
                {!hideCountryName && <span>{countryName}</span>}
              </span>
            </Select.Option>
          )
        })}
      </Select>
    </Form.Item>
  )
}
