create-card-detail-page

import { Redirect } from 'react-router-dom'

function Explore ({ token }) {
  if (!token) {
    return <Redirect to='/login' />
  }

main
  return (
    <div className='page-content'>
      <div>
        <h2>this is where folx can look around for friends or explore some genres</h2>
        <h2>. . . </h2>
        <h2>genres are like birthday, anniversary, happy taco tuesday day, etc.</h2>
        <h2>Just a little reminder note for everyone</h2>🤪
      </div>
    </div>

  )
}

export default Explore
