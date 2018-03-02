
const reducer = (state = [], action) => {
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
  return {
    type: 'CREATE',
    content
  }
}

export const vote = (anecdote) => {
  return {
    type: 'VOTE',
    data: anecdote
  }
}

export const initialization = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default reducer