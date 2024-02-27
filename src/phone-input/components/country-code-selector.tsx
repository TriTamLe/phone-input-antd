import type { TCountryCodeSelector } from '../types';
import type { SelectProps } from 'antd';

import { Form, Select } from 'antd';
import clsx from 'clsx';
import { defaultCountries, FlagImage } from 'react-international-phone';

import { DIAL_CODE_PREFIX } from '../constants';

export const CountryCodeSelector = ({
  name,
  selectProps: _selectProps,
  showCountryName = false,
  initialValue,
  className,
}: TCountryCodeSelector) => {
  const formClassName = clsx('m-0 mt-1', className);
  const selectProps: SelectProps = {
    onClick: e => {
      e.stopPropagation();
    },
    showSearch: true,
    optionFilterProp: 'label',
    bordered: false,
    popupMatchSelectWidth: false,
    ..._selectProps,
  };

  return (
    <Form.Item name={name} initialValue={initialValue} className={formClassName}>
      <Select {...selectProps}>
        {defaultCountries.map(([countryName, iso2, dialCode]) => {
          return (
            <Select.Option value={iso2} label={`${countryName}${iso2}${dialCode}`} key={iso2}>
              <span className="flex flex-row gap-2 items-center">
                <FlagImage iso2={iso2} size={30} />
                <span>{`${DIAL_CODE_PREFIX}${dialCode}`}</span>
                {showCountryName && <span>{countryName}</span>}
              </span>
            </Select.Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};
