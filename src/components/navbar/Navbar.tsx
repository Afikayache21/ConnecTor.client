import './navbar.scss'
import Clock from './clock/clock'; // Import the Clock component

function Navbar() {
    return (
        <div className='navbar'>
            <div className="logo">
            <span className='app-name'><span style={{color:'#ffae00'}}>Co</span>n<span style={{color:'#007ba8'}}>ne</span>c<span className='special-t' style={{color:'red'}}>T</span>or</span>

                <img style={{ width: '30px', height: '30px' }} src="appLogo.svg" alt="app logo" />
            </div>

            {/* Add the clock in the navbar */}
            <Clock />

            { <div className="nav-bar-icons">
                <img src="/search.svg" alt="search" />
                <img src="/app.svg" alt="app" />
                <img src="/expand.svg" alt="expand" />
                
                <div className="notification">
                    <img src="/notifications.svg" alt="notifications" />
                    <span>1</span>
                </div>

                <div className="user">
                    <img src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg" alt="user" />
                    <span>Joney</span>
                </div>

                <img src="settings.svg" alt="settings" />
            </div>}
        </div>
    );
}

export default Navbar;
