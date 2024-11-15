import './navbar.scss';
import { observer } from 'mobx-react';
import Clock from './clock/clock';
import { useStore } from '../../Store/store';
import { getUserFirstName } from '../../Api/agent';

function Navbar() {
    const { userStore, authStore,windowStore } = useStore();
    const {isMobile} = windowStore
    return (
        <div className='navbar'>
            <div className="logo">
                <span className='app-name'>
               <img style={{ width: '30px', height: '30px' }} src="appLogo.svg" alt="app logo" />
                    <span style={{ color: '#ffae00' }}>Co</span>n<span style={{ color: '#007ba8' }}>ne</span>c<span className='special-t' style={{ color: 'red' }}>T</span>or
                </span>
            </div>

            {authStore.isLoggedIn && <div className="nav-bar-icons">
                

                {/* <div className="nav-bar-icons navbar-icon notification">
                    <img src="/notifications.svg" alt="notifications" />
                    <span>1</span>
                </div> */}
                {!isMobile&&<Clock />}

                <div className="user">
                <span>{getUserFirstName() || "User"}</span>
                    {userStore.userImageBase64 ? (
                        <img src={userStore.userImageBase64} alt="User" />
                    ) : (
                        <img src="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg" alt="https://caricom.org/wp-content/uploads/Floyd-Morris-Remake-1024x879-1.jpg" />
                    )}
                    
                </div>
                {/* <img className='navbar-icon' src="settings.svg" alt="settings" /> */}
            </div>}              
        </div>
    );
}

export default observer(Navbar);
