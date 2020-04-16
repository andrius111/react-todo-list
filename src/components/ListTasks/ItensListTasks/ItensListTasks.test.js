import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ItensListTasks from './ItensListTasks'
import TaskModel from '../../../models/task.model'

describe('ItensListTasks tests', () => {
  const taskName = 'task'
  const task = new TaskModel(1, taskName, false)
  const completedTask = new TaskModel(2, taskName, true)
  
  it('must render the component whitout errors', () => {
    render(
      <ItensListTasks 
        tasks={ [] } 
        reloadTasks={ () => false } 
      />, 
      { wrapper: MemoryRouter }
    )
  })

  it('must show the task', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItensListTasks 
            tasks={ [task] }
            reloadTasks={ () => false }
          />
        </tbody>
      </table>,
      { wrapper: MemoryRouter }
    )

    expect(getByTestId('tr-task')).toHaveTextContent(taskName)
  })

  it('must show an completed task', () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <ItensListTasks 
            tasks={ [completedTask] }
            reloadTasks={ () => false }
          />
        </tbody>
      </table>,
      { wrapper: MemoryRouter }
    )

    expect(getByTestId('td-task-name')).toHaveStyle('text-decoration: line-through')
  })
})