import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Navbar, Form, FormControl, Nav } from 'react-bootstrap'
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
  const [searchContent, setSearchContent] = useState('')

  const ITENS_PER_PAGE = 10

  useEffect(() => {
    if (loadTasks) {
      let tasks = localStorage['todo-list-tasks'] ? JSON.parse(localStorage['todo-list-tasks']) : []
      tasks = tasks.filter(task => task.name.toLowerCase().indexOf(searchContent.toLowerCase()) >= 0)

      tasks.sort(task => task.completed ? 1 : -1)

      setTotalTasks(tasks.length)
      setTotalPendentsTasks((tasks.filter(task => !task.completed)).length)
      setTasks(tasks.splice((currentPage - 1) * ITENS_PER_PAGE, ITENS_PER_PAGE))
      setLoadTasks(false)
    }
  }, [loadTasks, currentPage, searchContent])
  
  function handleChangePage(page) {
    setCurrentPage(page)
    setLoadTasks(true)
  }

  function handleSearch(event) {
    setSearchContent(event.target.value)
    setLoadTasks(true)
  }

  return (
    <div className="text-center">
      <Navbar 
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>Todo's List ({ totalTasks })</Navbar.Brand>

        <Nav className="mr-auto">
          <Nav.Link>Pendent: { totalPendentsTasks }</Nav.Link>
          <Nav.Link>Finished: { totalTasks - totalPendentsTasks }</Nav.Link>
        </Nav>

        <Nav className="mr-auto"></Nav>

        <Form inline>
          <FormControl 
            type="text" 
            placeholder="Search" 
            size="sm" 
            value={ searchContent }
            onChange={ handleSearch }
            data-testid="input-search"
            style={{ width: '250px' }}
          />
        </Form>
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