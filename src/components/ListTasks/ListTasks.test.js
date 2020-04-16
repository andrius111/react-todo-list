import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import ListTasks from './ListTasks'

describe('ListTasks tests', () => {
  it('must render the component whitout errors', () => {
    render(<ListTasks />, { wrapper: MemoryRouter })
  })
})