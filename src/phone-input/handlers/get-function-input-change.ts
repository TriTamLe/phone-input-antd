import { FormInstance } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { THandlePhoneNumber } from '../types'

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
