// import holidayCardList from '../images/holidayCardList.jpg'
import gratefulCard from '../images/gratefulCard.jpg'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div className='home-page-container'>
      <div className='background' />
      <h2 className='homepage-header'>Welcome to Greetly</h2>
      <p>Design custom greeting cards for any occasion.</p>
      {/* <img className='image-h1' src={holidayCardList} alt='holidayCardList' width='100' height='200' /> */}
      <img className='image-h1' src={gratefulCard} alt='gratefulCard' />
      <p>Add images, styles and greetings to craft your perfect message.</p>
      <p><Link to='/login'>Log in</Link> or <Link to='/register'>Register</Link> to get started!</p>

      <Link to='/register'><button>Get Started!</button></Link>

    </div>
  )
}

export default Home
