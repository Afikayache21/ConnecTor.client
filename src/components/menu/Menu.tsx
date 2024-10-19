import './menu.scss'

import { Link } from 'react-router-dom'


function Menu() {
  return (
    <div className='menu'>
      <span className='app-name'><span style={{ color: '#ffae00' }}>Co</span>n<span style={{ color: '#007ba8' }}>ne</span>c<span className='special-t' style={{ color: 'red' }}>T</span>or</span>

      <div className="item">
        <span className="title">Main</span>
        <Link to='/' className='list-item'>
        <img src="/home.svg" alt="" />
        <span className="list-item-title">Home</span>
        </Link>
        <Link to='/profile' className='list-item'>
        <img src="/profile.svg" alt="" />
        <span className="list-item-title">Profile</span>
        </Link>
      </div>

      <div className="item">
        <span className="title">PROJECTS</span>
        <Link to='/projects' className='list-item'>
        <img src="/search.svg" alt="" />
        <span className="list-item-title">projects for me</span>
        </Link>
        <Link to='/projects' className='list-item'>
        <img src="/profile.svg" alt="" />
        <span className="list-item-title">My projects</span>
        </Link>
      </div>

      <div className="item">
        <span className="title">CHAT</span>
        <Link to='/' className='list-item'>
        <img src="/post.svg" alt="" />
        <span className="list-item-title">My chats</span>
        </Link>      
      </div>

      <div className="item">
        <span className="title">Bids</span>
        <Link to='/bids' className='list-item'>
        <img src="/post2.svg" alt="" />
        <span className="list-item-title">My bids</span>
        </Link>
        
      </div>

    </div>
  )
}

export default Menu
