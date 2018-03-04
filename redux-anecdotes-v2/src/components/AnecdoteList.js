import React from 'react'
import { vote } from './../reducers/anecdoteReducer'
import { notify } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from '../components/Filter'
import anecdoteService from '../services/anecdotes'

const addVote = async ( props, anecdote ) => {
  const newObject = { ...anecdote, votes: anecdote.votes +1 }
  const newAnec = await anecdoteService.update(anecdote.id, newObject)

  props.vote(newAnec)
  props.notify(`You voted '${anecdote.content}'`, 5)

}

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
          <button onClick={() => addVote(props, anecdote)}>vote</button>
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
  { vote, notify }
)(AnecdoteList)
