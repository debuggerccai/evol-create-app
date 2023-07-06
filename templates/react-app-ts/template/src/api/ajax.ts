/**
 * Create by lwcai
 * Description: ajax
 * Date: 2023-03-06
 */
import { message } from 'antd'
import axios from 'axios'
import { History } from 'history'
import { m } from 'templates/react-app/template/src/memory'
import getApiPath from './getApiPath'
import getFetchOptions from './getFetchOptions'


axios.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }

  return config
})

export default function ajax(path: string, data: object, method: 'GET' | 'POST') {
  let promise
  const fetchOptions = getFetchOptions(getApiPath(path), method)
  const { headers, endpoint } = fetchOptions
  const history: History = m.get('history')

  if (method === 'GET') {
    axios.defaults.headers.get = { ...headers }
    promise = axios.get(endpoint, { params: data })
  } else {
    axios.defaults.headers.post = { ...headers }
    promise = axios.post(endpoint, data)
  }

  return promise
    .then((res) => {
      if (!Reflect.has(res.data, 'result')) message.error('网络请求失败')

      return res.data || { result: false, msg: '' }
    })
    .catch((error) => {
      const { response = {} } = error
      const { data = {} } = response
      const originalRequest = error.config

      const login = () => {
        // eslint-disable-next-line no-restricted-globals
        location.href = `${data.login_url}?returnUrl=${encodeURIComponent(location.href)}`
      }

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (response.status) {
          case 500:
            history.push('/500')
            break
          case 403:
            history.push('/noright')
            break
          case 401:
            login()
            break
          default:
            console.error('请求失败了', error)
            message.error(data.msg || '网络请求失败')
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        if (error.code === 'ECONNABORTED' && error.message.includes('timeout') && !originalRequest._retry) {
          // 连接超时
          console.error('connect timeout...')
        }
      }

      return {
        result: false,
        message: ''
      }
    })
}
