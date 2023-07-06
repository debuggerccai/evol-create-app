import config from '../config'
import param from './param'

const { DEV, apiDomain } = config

interface ParamData {
  [propName: string]: any
}

export default function getApiPath(path: string, paramData?: ParamData): string {
  const basePath = DEV ? apiDomain : ''
  let params = param(paramData)

  if (params) {
    params = path.indexOf('?') === -1 ? `?${params}` : `&${params}`
  }
  return `${basePath}${path}${params}`
}
