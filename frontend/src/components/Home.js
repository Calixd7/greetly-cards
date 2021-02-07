import { Link } from 'react-router-dom'
function Home () {
  return (
    <div className='home-page-container'>
      <h2>Welcome to Greetly</h2>
      <p>Design custom greeting cards for any occastion.</p>
      <p>Add images, styles and greetings to craft your perfect message.</p>
      <p>Login or <Link to='/register'>Register</Link> to get started!</p>

    </div>
  )
}

export default Home
