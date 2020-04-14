import React from 'react'
import ReactDOM from 'react-dom'

import App from '../../App'
import ListTasks from './ListTasks'

describe('ListTasks tests', () => {
  it('must render the component whitout errors', () => {
    const div = document.createElement('div')

    ReactDOM.render(<App><ListTasks /></App>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})