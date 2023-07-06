import Cookie from 'js-cookie'

export default function getFetchOptions(endpoint: any, method: 'GET' | 'POST' = 'GET', opts: any = {}) {
  const headers = opts.headers || {}
  const defaultOptions = {
    ...opts,
    endpoint,
    method,
    credentials: 'include',
    headers: {
      Accept: '*/*',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': headers['Content-Type'] || 'application/json',
      'Authorization': Cookie.get('_auth_token'),
      ...headers,
    },
  }
  if (opts.formData) {
    delete defaultOptions.headers['Content-Type']
    delete defaultOptions.formData
  }
  return defaultOptions
}
