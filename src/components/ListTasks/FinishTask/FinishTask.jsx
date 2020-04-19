import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'

const FinishTask = (props) => {
  const [showModal, setShowModal] = useState(false)

  function handleOpenModal(event) {
    event.preventDefault()
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  function handleFinishTask(event) {
    event.preventDefault()

    let tasks = localStorage['todo-list-tasks'] ? JSON.parse(localStorage['todo-list-tasks']) : []

    tasks = tasks.map(task => {
      if (task.id === props.task.id) {
        task.completed = true
      }

      return task
    })

    localStorage['todo-list-tasks'] = JSON.stringify(tasks)
    setShowModal(false)
    props.reloadTasks(true)
  }

  return (
    <span className={ props.className }>
      <Button 
        className="btn-sm"
        onClick={ handleOpenModal }
        data-testid="btn-open-modal"
        title="Finish the task"
      >
        <FontAwesomeIcon icon={ faClipboardCheck } />
      </Button>

      <Modal 
        show={ showModal }
        onHide={ handleCloseModal }
        data-testid="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Finish task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Dou you really want to finish the task <strong>{ props.task.name }</strong>?
        </Modal.Body>

        <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={ handleFinishTask }
            data-testid="btn-finish-task-yes"
          >
            Yes  
          </Button>

          <Button 
            variant="light" 
            onClick={ handleCloseModal }
            data-testid="btn-finish-task-no"
          >
            No  
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  )
}

FinishTask.propTypes = {
  task: PropTypes.object.isRequired,
  reloadTasks: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default FinishTask