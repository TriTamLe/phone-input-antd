import { Rule, RuleObject } from 'antd/es/form'
import { StoreValue } from 'antd/es/form/interface'

export const hasValue = (value: StoreValue): boolean => {
  return value !== undefined && value.trim() !== ''
}
export const requiredRule = (msg: string, condition: boolean = true): Rule => {
  return {
    validator: (_: RuleObject, value: StoreValue) => {
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
