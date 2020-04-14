import React from 'react'
import ReactDOM from 'react-dom'

import UpdateTask from './UpdateTask'

describe('UpdateTask tests', () => {
  it('must render the component whitout errors', () => {
    const div = document.createElement('div')

    ReactDOM.render(<UpdateTask id={1} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})