import React from 'react'

class Notification extends React.Component {

  render() {
    if (this.props.store.getState().notification === null) {
      return null
    }
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {this.props.store.getState().notification}
      </div>
    )
  }
}

export default Notification
