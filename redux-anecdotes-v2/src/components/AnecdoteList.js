import React from 'react'
import { vote } from './../reducers/anecdoteReducer'
import { createNotif, deleteNotif } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from '../components/Filter'

const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    <Filter />
    {props.visibleAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {
            props.vote(anecdote.id, anecdote.content)
            props.createNotif(`You voted '${anecdote.content}'`)
            setTimeout(() => {
              props.deleteNotif()
            }, 5000)
          }}>vote</button>
        </div>
      </div>
    )}
  </div>
)

const anecdotesToShow = (anecdotes, filter) => {
  const filteroity = anecdotes.filter(function (anecdote) {
    return anecdote.content.toLowerCase().includes(filter)
  })
  return filteroity.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { vote, createNotif, deleteNotif }
)(AnecdoteList)
