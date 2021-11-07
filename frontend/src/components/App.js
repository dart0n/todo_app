import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { authenticateUser } from '../store/actions/auth'
import Auth from './Auth'
import Home from './Home'

function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  useEffect(() => {
    if (localStorage.getItem('token')) dispatch(authenticateUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      {!isAuthenticated ? (
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <Redirect to="/auth" />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      )}
    </BrowserRouter>
  )
}

export default App
