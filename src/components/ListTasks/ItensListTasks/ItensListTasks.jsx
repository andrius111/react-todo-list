import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import FinishTask from '../FinishTask/FinishTask'
import RemoveTask from '../RemoveTask/RemoveTask'

const ItensListTasks = (props) => {
  function setCompleted(task) {
    return task.completed ? 'line-through' : 'none'
  }
  
  function getEmptyTasks() {
    return (
      <tr key="tr-empty">
        <td
          className="text-center"
          colSpan="2"
        >
          <i>No tasks have been registered yet</i> 
        </td> 
      </tr>
    )
  }

  function getItensList() {
    return (
      props.tasks.map(task => (
        <tr 
          key={ task.id } 
          data-testid="tr-task"
        >
          <td
            className="text-left"
            data-testid="td-task-name"
            style={{ textDecoration: setCompleted(task) }}
          >
            { task.name }
          </td>  

          <td 
            className="text-right"
            width="140px"
          >
            <FinishTask 
              task={ task }
              reloadTasks={ props.reloadTasks }
              className={ task.completed ? 'hidden' : '' }
            />
            
            <Link 
              to={ "/update/" + task.id }
              className={ task.completed ? 'hidden' : 'btn btn-warning btn-sm' }
              style={{ 
                marginLeft: '10px',
                marginRight: '10px'
              }}
              title="Edit the task"
            >
              <FontAwesomeIcon icon={ faEdit } />
            </Link>

            <RemoveTask 
              task={ task }
              reloadTasks={ props.reloadTasks }
            />
          </td>
        </tr>
      ))
    )
  } 

  return (
    props.tasks.length ? getItensList() : getEmptyTasks()
  )
}

ItensListTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  reloadTasks: PropTypes.func.isRequired
}

export default ItensListTasks