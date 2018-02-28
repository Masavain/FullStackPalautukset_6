import React from 'react'
import { vote } from './../reducers/anecdoteReducer'
import { createNotif, deleteNotif } from './../reducers/notificationReducer'
import PropTypes from 'prop-types'

class AnecdoteList extends React.Component {


  voteAnecdote = (id, content) => () => {
    this.props.store.dispatch(vote(id))
    console.log(content)
    this.props.store.dispatch(createNotif(`You voted '${content}'`))
    setTimeout(() => {
      this.props.store.dispatch(deleteNotif())
    }, 5000)

  }
  render() {
    const anecdotes = this.props.store.getState().anecdotes
    const filter = this.props.store.getState().filter
    const filteroity = anecdotes.filter(function (anecdote) {
      return anecdote.content.toLowerCase().includes(filter)
    })

    return (
      <div>
        <h2>Anecdotes</h2>
        {filteroity.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={
                this.voteAnecdote(anecdote.id, anecdote.content)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteList
