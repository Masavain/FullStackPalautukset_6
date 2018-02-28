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

export const createNotif = (notif) => {
  return {
    type: 'NEW_NOTIF',
    notif
  }
}

export const deleteNotif = () => {
  return {
    type: 'DELETE_NOTIF',
  }
}


export default notificationReducer