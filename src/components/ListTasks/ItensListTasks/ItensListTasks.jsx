import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import FinishTask from '../FinishTask/FinishTask'

const ItensListTasks = (props) => {
  function setCompleted(task) {
    return task.completed ? 'line-through' : 'none'
  }
  
  return (
    props.tasks.map(task => (
      <tr 
        key={ task.id } 
        data-testid="tr-task"
      >
        <td
          width="75%"
          data-testid="td-task-name"
          style={{ textDecoration: setCompleted(task) }}
        >
          { task.name }
        </td>  

        <td className="text-right">
          <FinishTask 
            task={ task }
            reloadTasks={ props.reloadTasks }
            className={ task.completed ? 'hidden' : '' }
          />
          
          <Link 
            to={ "/update/" + task.id }
            className={ task.completed ? 'hidden' : 'btn btn-warning btn-sm' }
            style={{ marginLeft: '10px' }}
            title="Edit the task"
          >
            <FontAwesomeIcon icon={ faEdit } />
          </Link>
        </td>
      </tr>
    ))
  )
}

ItensListTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  reloadTasks: PropTypes.func.isRequired
}

export default ItensListTasks