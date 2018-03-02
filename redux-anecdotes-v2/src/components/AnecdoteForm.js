import React from 'react'
import { connect } from 'react-redux'
import { creation } from './../reducers/anecdoteReducer'
import { createNotif, deleteNotif } from './../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnec = await anecdoteService.createNew(content)
    this.props.creation(newAnec)
    this.props.createNotif(`You posted '${content}'`)
    setTimeout(() => {
      this.props.deleteNotif()
    }, 5000)

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
