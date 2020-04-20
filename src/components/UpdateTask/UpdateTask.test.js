import React from 'react'
import { Route, MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import TaskModel from '../../models/task.model'
import UpdateTask from './UpdateTask'

describe('UpdateTask tests', () => {
  const taskId = 1
  const task = new TaskModel(taskId, 'New task', false)

  beforeEach(() => {
    localStorage['todo-list-tasks'] = JSON.stringify([task])
  })

  it('must render the component whitout errors', () => {
    render(
      <MemoryRouter initialEntries={ [`/update/${taskId}`] }>
        <Route path="/update/:id" component={ UpdateTask } />
      </MemoryRouter>
    )
  })

  it('must show the modal when the task is updated', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ [`/update/${taskId}`] }>
        <Route path="/update/:id" component={ UpdateTask } />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('btn-update'))
    expect(getByTestId('modal')).toHaveTextContent('successfully')
  })

  it('must update an task', () => {
    const nameUpdatedTask = 'Updated task'
    const { getByTestId } = render(
      <MemoryRouter initialEntries={ [`/update/${taskId}`] }>
        <Route path="/update/:id" component={ UpdateTask } />
      </MemoryRouter>
    )

    fireEvent.change(getByTestId('input-task-name'), { target: { value: nameUpdatedTask } })
    fireEvent.click(getByTestId('btn-update'))

    const tasksStorage = JSON.parse(localStorage['todo-list-tasks'])
    expect(tasksStorage[0].name).toBe(nameUpdatedTask)
  })
})