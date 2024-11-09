import React, { useEffect, useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
// import userStore from '../../Store/UserStore';
import { useNavigate } from 'react-router-dom';

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
} from 'mdb-react-ui-kit';
import { useStore } from '../../Store/store';

// Define the type for the user state
interface User {
    email: string;
    password: string;
}


const Login: React.FC = observer(() => {

    const { authStore ,windowStore} = useStore();
    const {login} = authStore;

    const { isMobile } = windowStore;
    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    // Typing the event parameter
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onClick = async () => {
        let res: any = null;
        if (user) {
            res = await login(user.email,user.password); 

            console.log(res);
            
        }

        if (res) {        
            alert('Login successful');
            navigate('/', { replace: true });
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <MDBContainer style={{ maxWidth: '80%' }} className="my-5">
            <MDBCard>
                <MDBRow className='g-0'>
                    {!isMobile && (
                        <MDBCol md='6'>
                            <MDBCardImage
                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp'
                                alt="login form"
                                className='rounded-start w-100'
                                style={{ height: '80vh' }}
                            />
                        </MDBCol>
                    )}

                    <MDBCol md='6'>
                        <MDBCardBody className='d-flex flex-column'>
                            <div className='d-flex flex-row mt-2'>
                                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                <span className="h1 fw-bold mb-0">Logo</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                                Sign into your account
                            </h5>

                            <MDBInput
                                onChange={onChange}
                                name='email'
                                wrapperClass='mb-4'
                                label='Email address'
                                id='username-input'
                                type='email'
                                size="lg"
                            />
                            <MDBInput
                                onChange={onChange}
                                name='password'
                                wrapperClass='mb-4'
                                label='Password'
                                id='password-input'
                                type='password'
                                size="lg"
                            />

                            <MDBBtn onClick={onClick} className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>

                            <a className="small text-muted" href="#!">Forgot password?</a>
                            <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                                Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a>
                            </p>

                            <div className='d-flex flex-row justify-content-start'>
                                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                                <a href="#!" className="small text-muted">Privacy policy</a>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBCard>
        </MDBContainer>
    );
});

export default Login;
