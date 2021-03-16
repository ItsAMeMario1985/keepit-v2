import { Route, Switch } from 'react-router-dom'
import NewKeepitPage from './Pages/NewKeepitPage'
import HomePage from './Pages/HomePage'
import LoginForm from './Components/Forms/LoginForm'
import KeepitDetailPage from './Pages/KeepitDetailPage'
import styled from 'styled-components/macro'
import useToken from './Hooks/useToken'

function App() {
  const { token, setToken } = useToken()

  if (!token) {
    return (
      <StyledAppWrapper>
        <LoginForm setToken={setToken} />
      </StyledAppWrapper>
    )
  }

  return (
    <StyledAppWrapper>
      <Switch>
        <Route path="/new">
          <NewKeepitPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/detail/:id">
          <KeepitDetailPage />
        </Route>
      </Switch>
    </StyledAppWrapper>
  )
}

export default App

const StyledAppWrapper = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 500px;
  min-width: 250px;
  margin: 0px auto;
  box-shadow: rgb(0, 0, 0) 0px 0px 25px 0px;
  background-color: #fff;
  padding-bottom: 100px;
`
