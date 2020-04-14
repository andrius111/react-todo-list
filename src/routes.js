import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ListTasks from './components/ListTasks/ListTasks'
import NewTask from './components/NewTask/NewTask'
import UpdateTask from './components/UpdateTask/UpdateTask'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ ListTasks } />
      <Route path="/new" component={ NewTask } />
      <Route path="/update/:id" component={ UpdateTask } />
    </Switch>
  </BrowserRouter>
)

export default Routes