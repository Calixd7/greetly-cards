import { deleteCard } from '../api'

function Delete () {
  return (
    <div>
      <button type='button' onClick={() => deleteCard()}>Delete Card</button>
    </div>
  )
}

export default Delete
