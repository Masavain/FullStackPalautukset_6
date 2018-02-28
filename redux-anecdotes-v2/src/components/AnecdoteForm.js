import React from 'react'
import PropTypes from 'prop-types'
import { creation } from './../reducers/anecdoteReducer'
import { createNotif, deleteNotif } from './../reducers/notificationReducer'


class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.store.dispatch(creation(e.target.anecdote.value))
    this.props.store.dispatch(createNotif(`You posted '${e.target.anecdote.value}'` ))
    setTimeout(() => {
      this.props.store.dispatch(deleteNotif())
    }, 5000)
    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}
AnecdoteForm.contextTypes = {
  store: PropTypes.object
}


export default AnecdoteForm
