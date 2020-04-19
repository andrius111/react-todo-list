import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import TaskModel from '../../../models/task.model'
import RemoveTask from './RemoveTask'

describe('RemoveTask tests', () => {
  const taskName = 'test task'
  const task = new TaskModel(1, taskName, false)

  it('must render the component whithout erros', () => {
    render(
      <RemoveTask 
        task={ task } 
        reloadTasks={ () => false } 
      />, 
      { wrapper: MemoryRouter }
    )
  })

  it('must show the modal', () => {
    const { getByTestId } = render(
      <RemoveTask 
        task={ task } 
        reloadTasks={ () => false } 
      />, 
      { wrapper: MemoryRouter }
    )

    fireEvent.click(getByTestId('btn-show-modal-remove-task'))
    expect(getByTestId('modal-remove-task')).toHaveTextContent(taskName)
  })

  it('must remove one task', () => {
    localStorage['todo-list-tasks'] = JSON.stringify([task])

    const { getByTestId } = render(
      <RemoveTask 
        task={ task } 
        reloadTasks={ () => false } 
      />, 
      { wrapper: MemoryRouter }
    )

    fireEvent.click(getByTestId('btn-show-modal-remove-task'))
    fireEvent.click(getByTestId('btn-remove-task-yes'))

    const tasksStorage = JSON.parse(localStorage['todo-list-tasks'])
    expect(tasksStorage.length).toBe(0)
  })
})