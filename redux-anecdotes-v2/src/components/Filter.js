import React from 'react'
import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     filter: false,
  //   }
  // }

  handleChange = (event) => {
    event.preventDefault()
    // this.setState({ [event.target.name]: event.target.value })
    this.props.store.dispatch(filterChange(event.target.value))
    // input-kentän arvo muuttujassa event.target.value
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input
          type="text"
          name="filter"
          onChange={this.handleChange} />
      </div>
    )
  }
}

export default Filter