import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { 
  Button, 
  Form, 
  Container, 
  Modal, 
  Navbar,
  InputGroup
} from 'react-bootstrap'

export default () => {
  const [taskName, setTaskName] = useState('')
  const [validForm, setValidForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loadTask, setLoadTask] = useState(true)

  const { id } = useParams()
  const history = useHistory()
  
  useEffect(() => {
    if (loadTask) {
      setTaskName(getTask(id).name)
      setLoadTask(false)
    }
  }, [loadTask, id])

  function getTask(taskId) {
    return (
      localStorage['todo-list-tasks'] ? JSON.parse(localStorage['todo-list-tasks']) : []
    ).filter(task => task.id === parseInt(taskId))[0]
  }

  function handleCloseModal() {
    return history.push('/')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setValidForm(true)

    if (event.currentTarget.checkValidity() === true) {
      let tasks = localStorage['todo-list-tasks'] ? JSON.parse(localStorage['todo-list-tasks']) : []
      
      tasks = tasks.map(taskStorage => {
        if (taskStorage.id === parseInt(id)) {
          taskStorage.name = taskName
        }

        return taskStorage
      })

      localStorage['todo-list-tasks'] = JSON.stringify(tasks)      
      setShowModal(true)
    }
  }

  function handleTaskName(event) {
    setTaskName(event.target.value)
  }

  return (
    <React.Fragment>
      <Navbar 
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>Update Task</Navbar.Brand>
      </Navbar><br/>

      <Container>
        <Form
          validated={ validForm }
          noValidate
          onSubmit={ handleSubmit }
        >
          <InputGroup size="lg">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg">Task Name</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control 
              type="text"
              minLength="5"
              maxLength="100"
              required
              value={ taskName }
              onChange={ handleTaskName }
              data-testid="input-task-name"
            />

            <Form.Control.Feedback type="invalid">
              The task must contain at least 5 characteres.
            </Form.Control.Feedback>
          </InputGroup><br/>

          <Form.Group className="text-center">
            <Button 
              variant="success" 
              type="submit"
              data-testid="btn-update"
            >
              Update
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
            Task <strong>{ taskName }</strong> successfully updated 
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
      </Container>
    </React.Fragment>
  )
}