import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as PlusIcon } from '../Assets/plus.svg'

export default function CustomTagForm({ onSubmit }) {
  CustomTagForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    targetState: PropTypes.bool.isRequired,
  }

  return (
    <StyledForm onSubmit={onSubmit}>
      <input
        name="customTag"
        type="text"
        placeholder="Add your own tag..."
      ></input>
      <button>
        <PlusIcon></PlusIcon>
      </button>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 10px 0;
  input {
    width: 100%;
    height: 40px;
    border: 1px solid #eaeaea;
    padding-left: 15px;
    font-size: 14px;
  }

  button {
    border: 1px solid #eaeaea;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    background-color: white;
    margin-left: 5px;
    width: 40px;
  }
`

/*

 button:hover {
    svg {
      transform: rotate(45deg);
      transition: 3s;
    }
  }
*/
