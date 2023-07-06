import React from 'react'
import { ConfigProvider } from 'antd'
import { createBrowserHistory } from 'history'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import RenderRoutes from 'templates/react-app/template/src/routes'
import { m } from './memory'
import reportWebVitals from './reportWebVitals'
import 'css/index.less'

const history = createBrowserHistory()

// 缓存信息
m.set('history', history)

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <ConfigProvider>
    <BrowserRouter>
      <RenderRoutes />
    </BrowserRouter>
  </ConfigProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
