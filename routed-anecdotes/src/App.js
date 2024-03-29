import React from 'react'
import { Container, Table, Form, Button, Message, Grid, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route, Link, NavLink
} from 'react-router-dom'

const MenuBar = () => {

  const menuStyle = {
    border: 'hidden',
    padding: 10,
    borderWidth: 2,
    background: 'lightblue'
  }
  const linkStyle = {
    border: 'hidden',
    background: 'lightgrey',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 1,
    paddingRight: 1
  }

  return (
    <Menu inverted>
      <Menu.Item link>
        <Link to="/anecdotes">anecdotes</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/create">create new</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/about">about</Link>
      </Menu.Item>
    </Menu>
    // <div style={menuStyle}>
    //   <NavLink activeStyle={linkStyle} exact to='/anecdotes'>anecdotes</NavLink>&nbsp;
    //   <NavLink activeStyle={linkStyle} exact to='/create'>create new</NavLink>&nbsp;
    //   <NavLink activeStyle={linkStyle} exact to='/about'>about</NavLink>
    // </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>

  )
}
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const About = () => (
  <div>
    <Grid padded>
      <Grid.Row>
        <h2>About anecdote app</h2>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>

        </Grid.Column>
        <Grid.Column>
          <img src="https://vignette.wikia.nocookie.net/formalmethods/images/b/bb/Dijkstra.jpeg/revision/latest?cb=20090317132534" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')

  }

  render() {
    return (

      <div>
        <Form widths='equal' size='small' onSubmit={this.handleSubmit} >
          <h2>create a new anecdote</h2>
          <Form.Field inline true>
            <label>content</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field inline true>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field inline true>
            <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button>create</Button>
        </Form>
      </div>
    )

  }
}

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    borderColor: 'green',
    borderRadius: 4,
    padding: 10,
    borderWidth: 2
  }

  if (notification === null) {
    return null
  } else {
    return (
      <Message success>
        {notification}
      </Message>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: null
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote '${anecdote.content}' created!`
    })
    setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <div>
              <h1>Software anecdotes</h1>
              <MenuBar />
            </div>
            <Notification notification={this.state.notification} />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>
        </Router>
      </Container>
    )
  }
}

export default App
