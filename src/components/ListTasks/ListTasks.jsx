import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ItensListTasks from './ItensListTasks/ItensListTasks'
import Pagination from './Pagination/Pagination'

export default () => {
  const [tasks, setTasks] = useState([])
  const [loadTasks, setLoadTasks] = useState(true)
  const [totalTasks, setTotalTasks] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPendentsTasks, setTotalPendentsTasks] = useState('0')

  const ITENS_PER_PAGE = 10

  useEffect(() => {
    if (loadTasks) {
      let tasks = localStorage['todo-list-tasks'] ? JSON.parse(localStorage['todo-list-tasks']) : []
      let pendentsTasks = tasks.filter(task => !task.completed)

      tasks.sort((task) => {
        return task.completed ? 1 : -1
      })

      setTotalTasks(tasks.length)
      setTotalPendentsTasks(pendentsTasks.length)
      setTasks(tasks.splice((currentPage - 1) * ITENS_PER_PAGE, ITENS_PER_PAGE))
      setLoadTasks(false)
    }
  }, [loadTasks, currentPage])
  
  function handleChangePage(page) {
    setCurrentPage(page)
    setLoadTasks(true)
  }

  return (
    <div className="text-center">
      <Navbar 
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>Todo's List ({ totalPendentsTasks })</Navbar.Brand>
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

      <Pagination 
        totalItens={ totalTasks }
        itensPerPage={ ITENS_PER_PAGE }
        currentPage={ currentPage }
        changePage={ handleChangePage }
      />
    </div>
  )
}