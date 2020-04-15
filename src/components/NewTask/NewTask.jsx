import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { 
  Button, 
  Form, 
  Jumbotron, 
  Modal, 
  Navbar 
} from 'react-bootstrap'

import TaskModel from '../../models/task.model'

export default () => {
  const [task, setTask] = useState('')
  const [validForm, setValidForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  const history = useHistory()

  function handleTask(event) {
    setTask(event.target.value)
  }

  function handleCloseModal() {
    history.push('/')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setValidForm(true)

    if (event.currentTarget.checkValidity() === true) {
      const tasks = localStorage['todo-list-tasks'] ? JSON.parse(localStorage['todo-list-tasks']) : []
      tasks.push(new TaskModel(new Date().getTime(), task, false))
      localStorage['todo-list-tasks'] = JSON.stringify(tasks)

      setShowModal(true)
    }
  }

  return (
    <React.Fragment>
      <Navbar 
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>New Task</Navbar.Brand>
      </Navbar>

      <Jumbotron>
        <Form
          validated={ validForm }
          noValidate
          onSubmit={ handleSubmit }
        >
          <Form.Group>
            <Form.Label>Inform the task's name</Form.Label>
            <Form.Control 
              type="text"
              minLength="5"
              maxLength="100"
              required
              value={ task }
              onChange={ handleTask }
              data-testid="input-task"
            />

            <Form.Control.Feedback type="invalid">
              The task must containt at least 5 characteres.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="text-center">
            <Button 
              variant="success" 
              type="submit"
              data-testid="btn-add"
            >
              Add
            </Button>
            &nbsp;
            <Link to="/" className="btn btn-light">
              Go back
            </Link>
          </Form.Group>
        </Form>

        <Modal 
          show={ showModal } 
          onHide={ handleCloseModal }
          data-testid="modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
      
          <Modal.Body>
            Task successfully registered 
          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="success"
              onClick={ handleCloseModal }
            >
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </React.Fragment>
  )
}