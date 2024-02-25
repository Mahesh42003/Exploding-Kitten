import {Route, Switch} from 'react-router-dom'
import MatchGame from './components/MatchGame'
import ActualGame from './components/ActualGame'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={MatchGame} />
      <Route exact path="/actual-game" component={ActualGame} />
    </Switch>
  </>
)
export default App
