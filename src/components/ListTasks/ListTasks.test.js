import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import TaskModel from '../../models/task.model'
import ListTasks from './ListTasks'

describe('ListTasks tests', () => {
  const nameFirstTask = 'First task'
  const nameSecondTask = 'Second task'
  const nameThirdTask = 'Third task'

  beforeEach(() => {
    localStorage['todo-list-tasks'] = JSON.stringify([
      new TaskModel(1, nameFirstTask, false),
      new TaskModel(2, nameSecondTask, false),
      new TaskModel(3, nameThirdTask, false)
    ])
  })

  afterEach(() => {
    delete localStorage['todo-list-tasks']
  })

  it('must render the component whitout errors', () => {
    render(<ListTasks />, { wrapper: MemoryRouter })
  })

  it('must show an table with 3 tasks', () => {
    const { getByTestId } = render(<ListTasks />, { wrapper: MemoryRouter })
    const table = getByTestId('table')

    expect(table).toHaveTextContent(nameFirstTask)
    expect(table).toHaveTextContent(nameSecondTask)
    expect(table).toHaveTextContent(nameThirdTask)
  })

  it('must filter the tasks in the table', () => {
    const { getByTestId } = render(<ListTasks />, { wrapper: MemoryRouter })
    const table = getByTestId('table')

    fireEvent.change(getByTestId('input-search'), { target: { value: nameFirstTask } })

    expect(table).toHaveTextContent(nameFirstTask)
    expect(table).not.toHaveTextContent(nameSecondTask)
    expect(table).not.toHaveTextContent(nameThirdTask)
  })
})