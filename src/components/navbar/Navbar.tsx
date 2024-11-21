import './navbar.scss';
import { observer } from 'mobx-react';
import Clock from './clock/clock';
import { useStore } from '../../Store/store';
import { useNavigate } from 'react-router';

function Navbar() {
    const navigate = useNavigate();
    const { userStore, authStore, windowStore } = useStore();
    const { isMobile } = windowStore


    if (!userStore.user?.userImage) {
        userStore.setUser();
    } else {
        console.log('User image does not exist');
    }

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
                {!isMobile && <Clock />}

                {userStore.user && <div className="user">
                    <span>{userStore.user?.firstName || "User"}</span>

                        <img onClick={()=>{navigate('/profile')}} src={userStore.user?.userImage?userStore.user?.userImage:'./noavatar.png'} alt="User" />
                   

                </div>}
                {/* <img className='navbar-icon' src="settings.svg" alt="settings" /> */}
            </div>}
        </div>
    );
}

export default observer(Navbar);
