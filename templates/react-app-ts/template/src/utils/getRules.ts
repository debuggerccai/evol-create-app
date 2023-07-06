/**
 * @Author: Selvin
 * @Description: 获取表单规则
 */
import { FormRule } from 'antd'

type ConifgType = {
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
  decimal?: number; // 小数点位数
  validator?: (rule: any, value: any) => any;
}

function getRequiredText(formType: string, label = ''): string {
  let text = ''
  switch (formType) {
    case 'input':
    case 'inputNumber':
    case 'textarea':
    case 'checkbox':
    case 'upload':
    case 'picker':
      text = '请输入'
      break
    case 'select':
    case 'radio':
    case 'table':
      text = '请选择'
      break
    default:
      text = '请输入'
      break
  }
  return text + label
}

export function getRules(formType: string, label?: string, config?: ConifgType): Array<FormRule> {
  const requiredText = getRequiredText(formType, label) // 获取必填校验文本
  // 配置默认参数
  const mergeConfig = {
    required: true,
    min: 0,
    ...config
  }

  // 初始规则
  let rules: Array<FormRule> = []

  // whitespace 空格校验 仅针对input、textarea等手动输入的表单
  if (formType === 'input' || formType === 'textarea') {
    rules = [
      { required: mergeConfig.required, message: requiredText, validateTrigger: 'onBlur' }, // 必填校验
      { whitespace: true, message: `${label}不能为空`, validateTrigger: 'onBlur' } // 空格校验
    ]
  } else {
    // select、picker等组件，如果处于编辑状态，validateTriiger不能设置为onBlur，不然无法更新默认值，导致校验出错
    rules = [
      { required: mergeConfig.required, message: requiredText }, // 必填校验
    ]
  }

  // 字符长度校验
  if (Object.hasOwnProperty.call(mergeConfig, 'type') && mergeConfig.type === 'string') {
    const { min = 0, max } = mergeConfig
    if (min === 0 && max && max > 0) {
      rules.push({ max, message: `长度须在${max}个字以内` })
    }
    if (min > 0 && max && max > 0) {
      rules.push({ min, max, message: `长度须在${min}到${max}个字之间` })
    }
  }

  // 数字长度校验
  if (Object.hasOwnProperty.call(mergeConfig, 'type') && mergeConfig.type === 'number') {
    const { min = 0, max } = mergeConfig
    if (min === 0 && !max) {
      rules.push({
        validator: (rule, value) => {
          // !value.toString().replace(/\s*/g, '')
          if (value !== '' && value !== undefined && Number.isNaN(+value)) {
            return Promise.reject(new Error('请输入数字'))
          }
          if (value !== '' && value !== undefined && +value < min) {
            return Promise.reject(new Error(`数值须大于${min}`))
          }
          return Promise.resolve()
        },
      })
    }
    if (Reflect.has(mergeConfig, 'min') && Reflect.has(mergeConfig, 'max')) {
      rules.push({
        validator: (rule, value) => {
          if (value !== '' && Number.isNaN(+value)) {
            return Promise.reject(new Error('请输入数字'))
          }
          if (+value < min || +value > (max as number)) {
            return Promise.reject(new Error(`数值须在${min}~${max}之间`))
          }
          return Promise.resolve()
        },
      })
    }
  }

  // 小数点位数校验
  if (Object.hasOwnProperty.call(mergeConfig, 'decimal')) {
    const maxDecimal = mergeConfig.decimal ? +mergeConfig.decimal : 0
    rules.push({
      validator: (rule, value) => {
        if (value === undefined) return Promise.resolve()
        const [, precision] = value.toString().split('.')
        if (precision && precision.length > maxDecimal) {
          return Promise.reject(new Error(maxDecimal === 0 ? '请输入整数' : `小数须在${maxDecimal}以内`))
        }
        return Promise.resolve()
      }
    })
  }

  // range-picker
  if (Object.hasOwnProperty.call(mergeConfig, 'type') && mergeConfig.type === 'range-picker') {
    rules.push({
      validator: (rule, value) => {
        if (Array.isArray(value) && value.length && !value[0]) {
          return Promise.reject(new Error('请选择起始时间'))
        }
        return Promise.resolve()
      },
    })
  }

  // 自定义validator
  if (Object.hasOwnProperty.call(mergeConfig, 'validator') && mergeConfig.validator) {
    rules.push({ validator: mergeConfig.validator })
  }

  if (Object.hasOwnProperty.call(mergeConfig, 'type') && mergeConfig.type === 'email') {
    rules.push({ type: 'email' })
  }

  return rules
}


export function getTextAreaRules(label: string, config?: ConifgType): Array<FormRule> {
  // 配置默认参数
  const mergeConfig = { required: false, ...config }

  return getRules('textarea', label, { required: mergeConfig.required, type: 'string', max: 500 })
}
