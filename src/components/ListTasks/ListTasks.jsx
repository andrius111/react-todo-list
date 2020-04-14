import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Link 
      to="/new" 
      className="btn btn-success btn-sm"
    >
      New Task
    </Link>
  )
}