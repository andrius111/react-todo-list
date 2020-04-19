import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import TaskModel from '../../../models/task.model'
import FinishTask from './FinishTask'

describe('FinishTask tests', () => {
  const taskName = 'test task'
  const task = new TaskModel(1, taskName, false)

  it('must render the component whithout erros', () => {
    render(
      <FinishTask 
        task={ task } 
        reloadTasks={ () => false } 
      />, 
      { wrapper: MemoryRouter }
    )
  })

  it('must show the modal', () => {
    const { getByTestId } = render(
      <FinishTask 
        task={ task } 
        reloadTasks={ () => false } 
      />, 
      { wrapper: MemoryRouter }
    )

    fireEvent.click(getByTestId('btn-open-modal'))
    expect(getByTestId('modal')).toHaveTextContent(taskName)
  })

  it('must finish a task', () => {
    localStorage['todo-list-tasks'] = JSON.stringify([task])

    const { getByTestId } = render(
      <FinishTask 
        task={ task } 
        reloadTasks={ () => false } 
      />, 
      { wrapper: MemoryRouter }
    )

    fireEvent.click(getByTestId('btn-open-modal'))
    fireEvent.click(getByTestId('btn-finish-task-yes'))

    const tasksStorage = JSON.parse(localStorage['todo-list-tasks'])

    expect(tasksStorage[0].completed).toBeThruthy()
  })
})