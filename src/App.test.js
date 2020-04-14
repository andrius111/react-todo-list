import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

test('must render the main component whitout errors', () => {
  const div = document.createElement('div')

  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
