import { useState } from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as Logo } from '../../Assets/logo.svg'
import Button from '../Buttons/Button'
import { apiUserLogin } from '../../Services/apiRequests'

export default function RegisterForm({ setToken, setLoginOrRegister }) {
  const [emailInvalidMsg, setEmailInvalidMsg] = useState()
  const [passwordInvalidMsg, setPasswordInvalidMsg] = useState()
  const [responseMsg, setResponseMsg] = useState()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await apiUserLogin({
      email,
      password,
    })
    if (response.message && response.message.includes('Error')) {
      let message = response.message
      if (message === 'Error: User not exist.')
        setResponseMsg('Sorry, user not exists.')
      if (message === 'Error: Incorrect Password')
        setResponseMsg('Sorry, your password seems to be wrong.')
    } else {
      setToken(response)
    }
  }

  const handleInputChange = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    if (fieldName === 'email') setEmail(fieldValue)
    if (fieldName === 'password') setPassword(fieldValue)
  }

  const handleChangeView = () => {
    setLoginOrRegister('register')
  }

  const validateInput = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    let somethingWrong = false
    if (fieldName === 'email') {
      if (!fieldValue.includes('@') || !fieldValue.includes('.')) {
        somethingWrong = 'Email invalid.'
      }
      if (fieldValue.length < 3) {
        somethingWrong = 'Email to short.'
      }
      setEmailInvalidMsg(somethingWrong)
    }
    if (fieldName === 'password') {
      if (fieldValue.length === 0) {
        somethingWrong = 'Password is missing.'
      }
      setPasswordInvalidMsg(somethingWrong)
    }
  }

  return (
    <StyledLayout>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLogo width="188"></StyledLogo>
        <StyledInput
          type="email"
          name="email"
          placeholder="Email"
          onBlur={validateInput}
          onChange={handleInputChange}
          required
        ></StyledInput>
        <StyledInvalidMsg>{emailInvalidMsg}</StyledInvalidMsg>
        <StyledInput
          type="password"
          name="password"
          placeholder="Password"
          onBlur={validateInput}
          onChange={handleInputChange}
          required
        ></StyledInput>
        <StyledInvalidMsg>{passwordInvalidMsg}</StyledInvalidMsg>
        <StyledSumbitButton type="submit">Login</StyledSumbitButton>
        <StyledInvalidMsgResponse>{responseMsg}</StyledInvalidMsgResponse>
        <StyledSubText>
          No account yet?{' '}
          <StyledFooterLink onClick={handleChangeView}>
            Register here!
          </StyledFooterLink>
        </StyledSubText>
      </StyledForm>
    </StyledLayout>
  )
}

const StyledFooterLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: var(--color-primary);
`
const StyledSumbitButton = styled(Button)`
  margin: 0 0 15px 0;
  background-color: green;
`

const StyledSubText = styled.span`
  font-size: 12px;
`

const StyledInvalidMsg = styled.div`
  font-size: 9px;
  color: red;
  width: 100%;
  text-align: center;
  height: 10px;
`

const StyledInvalidMsgResponse = styled.div`
  font-size: 10px;
  color: red;
  width: 100%;
  text-align: center;
  height: 10px;
  margin-top: 5px;
`

const StyledLogo = styled(Logo)`
  margin: 0 0 30px 0;
`

const StyledInput = styled.input`
  border: 0;
  border-bottom: 1px solid #e3e3e3;
  margin: 5px 0;
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
    margin-top: 15px;
    cursor: pointer;
  }

  span {
    margin-top: 15px;
  }
`
