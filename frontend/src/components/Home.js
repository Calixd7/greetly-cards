
import getWellCard from '../images/getWellCard.jpg'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div className='home-page-container'>
      <div className='background' />
      <h2 className='homepage-header'>Welcome to Greetly</h2>
      <p className='p1'>Design custom greeting cards for any occasion.</p>
      {/* <img className='image-hp-card' src={getWellCard} alt='getWellCard' /> */}
      <p className='p2'>Add images, styles and greetings to craft your perfect message.</p>
      {/* <p className='p3'><Link to='/login'>Log in</Link> or <Link to='/register'>Register</Link> to get started!</p> */}

      <img className='image-hp-card' src={getWellCard} alt='getWellCard' />
      <Link className='signup-button' to='/register'><button className='signup-button'>Sign up here!</button></Link>

    </div>
  )
}

export default Home
