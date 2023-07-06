/**
 * Create by lwcai
 * Description: index
 * Date: 2023-02-22
 */
import React from 'react'
import { useRoutes } from 'react-router-dom'

import App from 'templates/react-app/template/src/views/layout'

const RenderRoutes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <App />,
      children: [
        {
        }
      ]
    },
  ])

  return element
}

export default RenderRoutes
