import {Component} from 'react'
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import './index.css'

const cardsList = [
  'Cat card',
  'Defuse card',

  'Shuffle card',

  'Exploding kitten card',
]
const deckOfCards = [
  {
    cardName: 'Defuse card',
  },
  {
    cardName: 'Defuse card',
  },
  {
    cardName: 'Cat card',
  },
  {
    cardName: 'Exploding kitten card',
  },
  {
    cardName: 'Shuffle card',
  },
]

class ActualGame extends Component {
  state = {
    score: 0,
    usersCards: cardsList,
    deck: deckOfCards,
    presentCard: '',
    defuseCardCount: 0,
    kittenCardCount: 0,
  }

  deckCards = () => {
    const {deck, usersCards, defuseCardCount} = this.state
    const randomNumber = Math.random()
    const randomCard = randomNumber * deck.length
    const ceilingOfRandomNumber = Math.round(randomCard)
    console.log(ceilingOfRandomNumber)

    if (deck[ceilingOfRandomNumber] === undefined) {
      this.setState({presentCard: ''})
    } else if (deck[ceilingOfRandomNumber].cardName === 'Cat card') {
      const filteredList = deck.filter(
        each => each.cardName !== deck[ceilingOfRandomNumber].cardName,
        this.setState(prevState => ({
          score: prevState.score + 1,
        })),
      )

      this.setState(prevState => ({
        deck: filteredList,
        score: prevState.score + 1,
      }))
    } else if (deck[ceilingOfRandomNumber].cardName === 'Shuffle card') {
      this.setState({
        score: 0,
        usersCards: cardsList,
        deck: deckOfCards,
        presentCard: '',
        defuseCardCount: 0,
        kittenCardCount: 0,
      })
    } else if (deck[ceilingOfRandomNumber].cardName === 'Defuse card') {
      const filteredList = deck.filter(
        each => deck.indexOf(each) !== ceilingOfRandomNumber,
      )
      const filtering = deck.filter(
        each => deck.indexOf(each) === ceilingOfRandomNumber,
      )
      this.setState(prevState => ({
        deck: filteredList,
        usersCards: [
          deck[ceilingOfRandomNumber].cardName,
          ...prevState.usersCards,
        ],
        defuseCardCount: prevState.defuseCardCount + 1,
        score: prevState.score + 1,
      }))
    } else if (
      deck[ceilingOfRandomNumber].cardName === 'Exploding kitten card'
    ) {
      const filteredList = deck.filter(
        each => deck.indexOf(each) !== ceilingOfRandomNumber,
      )
      const filtering = deck.filter(
        each => deck.indexOf(each) === ceilingOfRandomNumber,
      )

      this.setState(prevState => ({
        deck: filteredList,
        usersCards: [
          deck[ceilingOfRandomNumber].cardName,
          ...prevState.usersCards,
        ],
        kittenCardCount: prevState.kittenCardCount + 1,
        score: prevState.score + 1,
      }))
    }
  }

  yesbutton = () => {
    const {history} = this.props
    history.replace('/')
  }

  playagain = () => {
    this.setState({
      score: 0,
      usersCards: cardsList,
      deck: deckOfCards,
      presentCard: '',
      defuseCardCount: 0,
      kittenCardCount: 0,
    })
  }

  render() {
    const {
      score,
      presentCard,
      deck,
      usersCards,
      defuseCardCount,
      kittenCardCount,
    } = this.state
    if (deck.length === 1) {
      return (
        <div className="card-flexing">
          <h2>Congratulations,You Won the Game</h2>
          <div className="aligning-cards1">
            <button onClick={this.playagain} className="play-again">
              Play Again
            </button>
            <Popup modal trigger=<button className="yesbutton">Exit</button>>
              {close => (
                <div>
                  <p className="popup-alignment">Are you want to exit?</p>
                  <div className="aligning-cards1">
                    <button onClick={this.yesbutton} className="yesbutton">
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        close()
                      }}
                      className="nobutton"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      )
    }
    if (defuseCardCount < kittenCardCount) {
      return (
        <div className="card-flexing">
          <h1>You Lose the Game</h1>
          <p>You card is exploring kitten card</p>
          <div className="aligning-cards1">
            <button onClick={this.playagain} className="play-again">
              Play Again
            </button>

            <Popup modal trigger=<button className="yesbutton">Exit</button>>
              {close => (
                <div>
                  <p className="popup-alignment">Are you want to exit?</p>
                  <div className="aligning-cards1">
                    <button onClick={this.yesbutton} className="yesbutton">
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        close()
                      }}
                      className="nobutton"
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      )
    }
    return (
      <div className="card-flexing">
        <div className="aligning-cards1">
          <p className="Score-aligning">
            Score: <span>{score}</span>
          </p>

          <Popup
            modal
            trigger=<button className="yesbutton margining">Exit</button>
          >
            {close => (
              <div>
                <p className="popup-alignment">Are you want to exit?</p>
                <div className="aligning-cards1">
                  <button onClick={this.yesbutton} className="yesbutton">
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      close()
                    }}
                    className="nobutton"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
        <button
          onClick={this.deckCards}
          className="margin-aligning deck-cards-styling"
        >
          Deck of Cards
        </button>
        <ul className="aligning-cards">
          {usersCards.map(each => (
            <li className="deck-cards-styling1">
              <p className="margin-aligning1">{each}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default ActualGame
