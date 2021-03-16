import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as Bgfoot } from '../../Assets/bg-foot3.svg'
import { renderToStaticMarkup } from 'react-dom/server'

Footer.propTypes = {
  actionButtonText: PropTypes.string.isRequired,
  actionButtonIcon: PropTypes.element.isRequired,
  leftIcon: PropTypes.element.isRequired,
  leftOnClick: PropTypes.func.isRequired,
  rightIcon: PropTypes.element.isRequired,
  rightOnClick: PropTypes.func.isRequired,
}

export default function Footer(props) {
  const svgString = encodeURIComponent(renderToStaticMarkup(<Bgfoot />))
  const footerBgColoer = 'var(--color-bg)'
  return (
    <StyledFooter bgColor={footerBgColoer}>
      <StyledBgArea>
        <StyleBgLeft />
        <StyleBgRight></StyleBgRight>

        <StyledBgMiddle
          style={{ backgroundImage: `url("data:image/svg+xml,${svgString}")` }}
        >
          <StyledText>{props.actionButtonText}</StyledText>
        </StyledBgMiddle>
      </StyledBgArea>
      <StyledButtonArea>
        <StyledLeftIconWrapper
          data-testid="TestLeftIcon"
          onClick={props.leftOnClick}
        >
          {props.leftIcon}
        </StyledLeftIconWrapper>
        <StyledIcon>{props.actionButtonIcon}</StyledIcon>
        <StyledRightIconWrapper
          data-testid="TestRightIcon"
          onClick={props.rightOnClick}
        >
          {props.rightIcon}
        </StyledRightIconWrapper>
      </StyledButtonArea>
    </StyledFooter>
  )
}
const StyledIcon = styled.div`
  cursor: pointer;
`

const StyledButtonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 60px;
`
const StyledLeftIconWrapper = styled.div`
  width: 25px;
  cursor: pointer;
  text-align: center;
`
const StyledRightIconWrapper = styled.div`
  width: 25px;
  cursor: pointer;
  text-align: center;
`

const StyledFooter = styled.footer`
  background-color: ${(props) => props.bgColor};
  bottom: 0px;
  width: 100%;
  position: fixed;
  max-width: 500px;
  z-index: 300;
`
const StyledBgArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 30px;
`
const StyleBgLeft = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;

  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.13);
  text-align: center;
  height: 30px;
`
const StyledBgMiddle = styled.div`
  min-width: 140px;
  background-position: top;
  background-repeat: no-repeat;
  margin-top: -2px;
  text-align: center;
`
const StyleBgRight = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  box-shadow: 2px 3px 5px -1px rgba(0, 0, 0, 0.13);
  text-align: center;
  height: 30px;
  order: 3;
`
const StyledText = styled.div`
  margin-top: 17px;
  font-size: 12px;
  color: rgb(80, 80, 80);
`

/*

  &:before {
    position: absolute;
    top: -18px;
    content: '_';
    color: white;
    width: 100%;
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 40%,
      rgba(255, 255, 255, 0) 80%
    );
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    z-index: 100;
  }
*/
