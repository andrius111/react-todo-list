import React from 'react'
import ReactDOM from 'react-dom'

import NewTask from './NewTask'

describe('NewTask tests', () => {
  it('must render the component whitout errors', () => {
    const div = document.createElement('div')

    ReactDOM.render(<NewTask />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})