import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

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
          <Link 
            to={ "/update/" + task.id }
            className={ task.completed ? 'hidden' : 'btn btn-warning btn-sm' }
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