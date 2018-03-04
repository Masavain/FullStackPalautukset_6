import anecdoteService from '.././services/anecdotes'
const anecdoteReducer = (state = [], action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'INIT_ANECDOTES':
    return action.data
  case 'VOTE':
    return [ ...state.filter(a => a.id !==action.data.id), action.data ]

  case 'CREATE':
    return [ ...state, action.content]
  default:
    return state
  }

}

export const creation = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      content: newAnec
    })
  }
}

export const vote = (anecdote) => {
  return {
    type: 'VOTE',
    data: anecdote
  }
}

export const initialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer