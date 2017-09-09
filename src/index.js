import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
const store = configureStore()
render(
  <Provider store={configureStore}>
    <Root />
  </Provider>,
  document.getElementById('root')
)
