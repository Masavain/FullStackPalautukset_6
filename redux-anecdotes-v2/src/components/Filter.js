import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from './../reducers/filterReducer'

class Filter extends React.Component {
  changeFilter = (event) => {
    event.preventDefault()
    this.props.filterChange(event.target.value)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return(
      <div style={style}>
          filter <input
          type="text"
          name="filter"
          onChange={this.changeFilter} />
      </div>
    )
  }
}

export default connect(
  null,
  { filterChange }
)(Filter)