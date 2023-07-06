export default function param(paramData?: { [k: string]: any }) {
  const params: any = []
  const escape = window.encodeURIComponent

  if (!paramData || typeof paramData !== 'object') {
    return ''
  }


  // eslint-disable-next-line prefer-const
  for (let [key, val] of Object.entries(paramData)) {
    if (val === undefined || val === null) val = ''
    params.push(`${escape(key)}=${escape(val)}`)
  }

  return params.join('&')
}
