import React from 'react'
import { connect } from 'react-redux'
import { creation } from './../reducers/anecdoteReducer'
import { createNotif, deleteNotif } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.creation(event.target.anecdote.value)
    this.props.createNotif(`You posted '${event.target.anecdote.value}'`)
    setTimeout(() => {
      this.props.deleteNotif()
    }, 5000)
    event.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { createNotif, deleteNotif, creation }
)(AnecdoteForm)
