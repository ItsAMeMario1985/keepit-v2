import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as Logo } from '../../Assets/logo.svg'
import Button from '../Buttons/Button'
async function loginUser(credentials) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

  return fetch(apiBaseUrl + '/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json())
}

export default function LoginForm({ setToken }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submit..')
    const token = await loginUser({
      email,
      password,
    })
    setToken(token)
  }

  return (
    <StyledLayout>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLogo width="188"></StyledLogo>
        <StyledInput
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></StyledInput>
        <StyledInput
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></StyledInput>
        <Button type="submit">Login</Button>
        <span>
          No account yet? <a href="#">Register now!</a>
        </span>
      </StyledForm>
    </StyledLayout>
  )
}

const StyledLogo = styled(Logo)`
  margin: 0 0 30px 0;
`

const StyledInput = styled.input`
  border: 0;
  border-bottom: 1px solid #e3e3e3;
  margin: 10px 0;
  font-size: 16px;
  background-color: #f4f4f4;
  width: 250px;
  color: var(--color-secondary);
`

const StyledLayout = styled.div`
  display: grid;
  place-items: center;
  background-color: #f4f4f4;

  height: 100%;
  top: 0;
  width: 100%;
  font-size: 112.5%;
  overflow: hidden;
  position: fixed;
  max-width: 500px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-top: 20px;
  }

  span {
    margin-top: 25px;
  }
`
