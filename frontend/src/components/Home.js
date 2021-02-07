import holidayCardList from '../images/holidayCardList.jpg'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div className='page-container'>
      <h2 className='homepage-header'>Welcome to Greetly</h2>
      <p>Design custom greeting cards for any occastion.</p>
      <img src={holidayCardList} alt='holidayCardList' width='100' height='200' />
      <p>Add images, styles and greetings to craft your perfect message.</p>
      <p><Link to='/login'>Log in</Link> or <Link to='/register'>Register</Link> to get started!</p>

      <Link to='/register'><button>Get Started!</button></Link>

    </div>
  )
}

export default Home
