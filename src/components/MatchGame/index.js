import {Component} from 'react'
import './index.css'

const cardsList = [
  {
    id: 1,
    cardName: 'Cat card',
  },
  {
    id: 2,
    cardName: 'Defuse card',
  },
  {
    id: 3,
    cardName: 'Shuffle card',
  },
  {
    id: 4,
    cardName: 'Exploding kitten card',
  },
]

class MatchGame extends Component {
  state = {username: '', emptyUsername: ''}

  onStarting = event => {
    event.preventDefault()
    const {history} = this.props
    const {username} = this.state
    if (username.length !== 0) {
      history.replace('/actual-game')
      this.setState({emptyUsername: ''})
    } else {
      this.setState({emptyUsername: 'Please enter any name'})
    }
  }

  enteringName = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const {score, emptyUsername} = this.state
    return (
      <div>
        <h1 className="heading-of-app">Exploding Kittens</h1>
        <form className="username-form">
          <label htmlFor="username">USERNAME</label>
          <input type="text" id="username" onChange={this.enteringName} />
          <button onClick={this.onStarting} className="start-button ">
            Start
          </button>
          <p>{emptyUsername}</p>
        </form>
      </div>
    )
  }
}
export default MatchGame
