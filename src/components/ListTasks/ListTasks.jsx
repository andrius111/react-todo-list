import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ItensListTasks from './ItensListTasks/ItensListTasks'

export default () => {
  const [tasks, setTasks] = useState([])
  const [loadTasks, setLoadTasks] = useState(true)

  useEffect(() => {
    if (loadTasks) {
      setTasks(localStorage['todo-list-tasks'] ? JSON.parse(localStorage['todo-list-tasks']) : [])
      setLoadTasks(false)
    }
  }, [loadTasks])
  
  return (
    <div className="text-center">
      <Navbar 
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>Todo List</Navbar.Brand>
      </Navbar>

      <Table 
        striped
        bordered
        hover
        responsive
        variant="dark"
        data-testid="table"
      >
        <thead>
          <tr>
            <th>Task</th>
            <th>
              <Link 
                to="/new"
                className="btn btn-success btn-sm"
                data-testid="btn-new-task"
              >
                <FontAwesomeIcon icon={ faPlus } /> New Task
              </Link>
            </th>
          </tr>
        </thead>

        <tbody>
          <ItensListTasks 
            tasks={ tasks } 
            reloadTasks={ setLoadTasks }
          />
        </tbody>
      </Table>
    </div>
  )
}