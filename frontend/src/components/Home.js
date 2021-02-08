import holidayCard from '../images/holidayCard.jpg'
import panaramic from '../images/panaramic.jpg'
import getWellCard from '../images/getWellCard.jpg'
import { Link } from 'react-router-dom'

function Home () {
  return (
    <div className='home-page-container'>
      <div className='background' />
      <h2 className='homepage-header'>Welcome to Greetly</h2>
      <p className='p1'>Design custom greeting cards in minutes, using our professionaly designed card templates.</p>
      {/* <img className='image-hp-card' src={getWellCard} alt='getWellCard' /> */}
      <p className='p2'>Add images, styles and greetings to craft your perfect message.</p>
      <p className='p3'><Link to='/login'>Log in</Link> or <Link to='/register'>Register</Link> to get started! Then...</p>
      <p className='p4'>1. Navigate to the Create page and design your custom greeting card. </p>
      <p className='p5'>2. Save your card.  Share it or keep it to yourself.</p>
      <p className='p6'>3. Explore other user's cards and connect with your favorite creative greeting card makers.</p>
      <div className='image-hp-card'>
        <div className='signup-button'>
          {/* <img className='image-hp-card' src={getWellCard} alt='getWellCard' /> */}
          <Link to='/register'><button className='button-style'>Create a Card</button></Link>
        </div>
        <img src={panaramic} alt='panaramic' className='image-styling' />
      </div>
    </div>
  )
}

export default Home
