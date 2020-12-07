/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'overmind-react'
import { BrowserRouter, Route } from 'react-router-dom'
import loadable from '@loadable/component'

import reportWebVitals from './reportWebVitals'

const App = loadable(
  /* istanbul ignore next */ () => import('./views/App/index')
)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
