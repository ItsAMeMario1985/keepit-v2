import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { ReactComponent as Logo } from '../../Assets/logo.svg'

export default function Header() {
  const history = useHistory()
  function handleOnClick() {
    history.push('/')
  }
  return (
    <StyledHeader>
      <Logo data-testid="TestHeaderLogo" width="157" onClick={handleOnClick} />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;

  svg  {
    cursor: pointer;
  }
`
