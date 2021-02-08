import gratefulCard from '../images/gratefulCard.jpg'
import getWellCard from '../images/getWellCard.jpg'
import { Link } from 'react-router-dom'

function Home ({ isLoggedIn }) {
  return (
    <div className='home-page-container'>
      <div className='background' />
      <h2 className='homepage-header'>Welcome to Greetly</h2>
      <p className='p1'>Design custom greeting cards in minutes, using our professionaly designed card templates.</p>
      <img className='image2-hp-card' src={gratefulCard} alt='gratefulCard' width='400' height='300' />
      <p className='p2'>Add images, styles and greetings to craft your perfect message.</p>
      <p className='p3'><Link to='/login'>Log in</Link> or <Link to='/register'>Register</Link> to get started! Then...</p>
      <p className='p4'><span className='number'>1</span> Navigate to the Create page and design your custom greeting card. </p>
      <p className='p5'><span className='number'>2</span> Save your card.  Share it or keep it to yourself.</p>
      <p className='p6'><span className='number'>3</span> Explore other user's cards and connect with your favorite creative greeting card makers.</p>
      <div className='image-hp-card'>
        <div className='signup-button'>
          {isLoggedIn
            ? (
              <span>
                <Link to='/create'><button className='button-style'>Create a Card</button></Link>
              </span>
              )
            : (
              <span>
                <Link to='/register'><button className='button-style'>Create a Card</button></Link>
              </span>
              )}
          {/* <Link to='/register'><button className='button-style'>Create a Card</button></Link> */}
        </div>
        {/* <img src={panaramic} alt='panaramic' className='image-styling' /> */}
        <img src={getWellCard} alt='getWellCard' className='image-styling' />
      </div>
    </div>
  )
}

export default Home
