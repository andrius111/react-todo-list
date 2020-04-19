import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const RemoveTask = (props) => {
  const [showModal, setShowModal] = useState(false)
  
  function handleShowModal(event) {
    event.preventDefault()
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  function handleRemoveTask(event) {
    event.preventDefault()

    let tasks = localStorage['todo-list-tasks'] ? JSON.parse(localStorage['todo-list-tasks']) : []
    tasks = tasks.filter(task => task.id !== props.task.id)

    localStorage['todo-list-tasks'] = JSON.stringify(tasks)
    setShowModal(false)
    props.reloadTasks(true)
  }

  return (
    <span>
      <Button
        variant="danger" 
        className="btn-sm" 
        onClick={ handleShowModal }
        data-testid="btn-show-modal-remove-task"
      >
        <FontAwesomeIcon icon={ faTrashAlt } />
      </Button>

      <Modal 
        show={ showModal }
        onHide={ handleCloseModal }
        data-testid="modal-remove-task"
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Dou you really want to Remove the task <strong>{ props.task.name }</strong>?
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={ handleRemoveTask }
            data-testid="btn-remove-task-yes"
          >
            Yes  
          </Button>

          <Button 
            variant="light" 
            onClick={ handleCloseModal }
            data-testid="btn-remove-task-no"
          >
            No  
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  )
}

RemoveTask.propTypes = {
  task: PropTypes.object.isRequired,
  reloadTasks: PropTypes.func.isRequired
}

export default RemoveTask