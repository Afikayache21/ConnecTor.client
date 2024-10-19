import './menu.scss'

import { Link } from 'react-router-dom'


function Menu() {
  return (
    <div className='menu'>
      <div className="item">
        <span className="title">MAIN</span>
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
        <img src="/home.svg" alt="" />
        <span className="list-item-title">Home</span>
        </Link>
        <Link to='/projects' className='list-item'>
        <img src="/profile.svg" alt="" />
        <span className="list-item-title">Profile</span>
        </Link>
      </div>

      <div className="item">
        <span className="title">CHAT</span>
        <Link to='/' className='list-item'>
        <img src="/home.svg" alt="" />
        <span className="list-item-title">Home</span>
        </Link>
        <Link to='/' className='list-item'>
        <img src="/profile.svg" alt="" />
        <span className="list-item-title">Profile</span>
        </Link>
      </div>

      <div className="item">
        <span className="title">CHAT</span>
        <Link to='/' className='list-item'>
        <img src="/home.svg" alt="" />
        <span className="list-item-title">Home</span>
        </Link>
        <Link to='/' className='list-item'>
        <img src="/profile.svg" alt="" />
        <span className="list-item-title">Profile</span>
        </Link>
      </div>

    </div>
  )
}

export default Menu
