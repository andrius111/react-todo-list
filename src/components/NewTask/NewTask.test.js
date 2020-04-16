import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import NewTask from './NewTask'

describe('NewTask tests', () => {
  it('must render the component whitout errors', () => {
    render(<NewTask />, { wrapper: MemoryRouter })
  })

  it('must add a new task', () => {
    const { getByTestId } = render(<NewTask />, { wrapper: MemoryRouter })

    fireEvent.change(getByTestId('input-task'), { target: { value: 'New task' } })
    fireEvent.click(getByTestId('btn-add'))

    expect(getByTestId('modal')).toHaveTextContent('Success')
    expect(getByTestId('modal')).toHaveTextContent('Task New task successfully registered')
  })
})