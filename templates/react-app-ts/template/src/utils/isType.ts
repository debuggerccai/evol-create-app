/**
 * Create by lwcai
 * Description: isType
 * Date: 2023-03-06
 */
export const type = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()

export const isBoolean = (obj: any) => type(obj) === 'boolean'
export const isNumber = (obj: any) => type(obj) === 'number'
export const isString = (obj: any) => type(obj) === 'string'
export const isFunction = (obj: any) => type(obj) === 'function'
export const isArray = (obj: any) => type(obj) === 'array'
export const isObject = (obj: any) => type(obj) === 'object'
export const isNull = (obj: any) => type(obj) === 'null'
export const isUndefined = (obj: any) => type(obj) === 'undefined'

export const isEmpty = (obj: any) => obj === null || obj === '' ||   obj === undefined

export const isEmail = (mail: string): boolean => {
  const pattern = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/

  return pattern.test(mail)
}



