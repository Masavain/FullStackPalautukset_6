const initialState = null

const notificationReducer = (state = initialState, action) => {
  console.log('ACTION', action)
  switch (action.type) {
  case 'NEW_NOTIF':
    return action.notif
  case 'DELETE_NOTIF':
    return null
  default:
    return state
  }
}

export const notify = (notif, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW_NOTIF',
      notif
    })
    setTimeout(() => {
      dispatch({
        type: 'DELETE_NOTIF',
      })
    }, 1000*seconds)
  }
}


export default notificationReducer