import React, { useState } from 'react';
import Select from 'react-select';
import './registerDesktop.scss';
// import './registerMobile.scss';
import { Link, useNavigate } from 'react-router-dom';
import { register, IUser } from '../../services/AuthService';
import { getToken } from '../../Api/agent';
import { ISelectOption } from '../../Store/CommonStore';
import { useStore } from '../../Store/store';



// const workingAreaOptions: ISelectOption[] = [
//   { value: 1, label: 'Area 1' },
//   { value: 2, label: 'Area 2' },
//   { value: 3, label: 'Area 3' },
// ];

// const professionsList: ISelectOption[] = [
//   { value: 1, label: 'Electrician' },
//   { value: 2, label: 'AC Tech' },
//   { value: 3, label: 'Plumber' },
// ];

const Register: React.FC = () => {

  const {CommonStore} = useStore();
//   const{allProffesios,allRegions}=CommonStore

// const [proffesions ,setProffesions]= useState()
// const [reions ,setRegions]= useState()


  const navigate = useNavigate();

  if (localStorage.getItem('isLoggedIn') == 'true') {
    navigate('/')
  }


  const [activeTab, setActiveTab] = useState<'customer' | 'constructor'>('customer');
  //const [selectedWorkingArea, setSelectedWorkingArea] = useState<IWorkingAreaOption | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<ISelectOption | null>(null);

  const [user, setUser] = useState<IUser>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    regionID: 1,
    professionID: 1, // Changed to professionID
    businessLicenseCode: '0', // Added this property
    telephone: '',
    userImage: null, // Image initially set to null
    creationDate: new Date().toISOString(),
    activeStatus: true,
    userTypeID: 1 // Added this property
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          userImage: reader.result as string, // Base64 image string
        }));
      };
      reader.readAsDataURL(file); // Convert image to Base64 string
    }
  };

  const handleRegisterClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!user.password || !user.email || !user.firstName || !user.lastName || !user.telephone) {
      alert('Please fill in all required fields.');
      return;
    }

    //  if (activeTab === 'constructor' && (!selectedWorkingArea || !selectedProfession)) {
    //   alert('Please select a working area and profession.');
    //   return;
    // }

    const userToRegister: IUser = {
      ...user,
      // regionID: selectedWorkingArea ? parseInt(selectedWorkingArea.value) : user.regionID,
      professionID: selectedProfession ? selectedProfession.value : user.professionID,
    };

    try {
      const isSuccess = await register(userToRegister);
      if (isSuccess) {
        navigate('/login');
      } else {
        alert('Registration failed.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className='register'>
      <div className='tab-bar'>
        <button
          className={`tab ${activeTab === 'customer' ? 'active' : ''}`}
          onClick={() => setActiveTab('customer')}
        >
          I'm a customer
        </button>
        <button
          className={`tab ${activeTab === 'constructor' ? 'active' : ''}`}
          onClick={() => setActiveTab('constructor')}
        >
          I'm a constructor
        </button>
      </div>

      <div className='register-card'>
        <h1>Register</h1>

        <div className='inputs-form'>
          <input
            type="text"
            name="firstName"
            placeholder='First name'
            value={user.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder='Last name'
            value={user.lastName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder='Email'
            value={user.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={user.password}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="telephone"
            placeholder='Phone number'
            value={user.telephone}
            onChange={handleInputChange}
          />

          {activeTab === 'constructor' && (
            <>
              <input
                type="text"
                placeholder='License Code'
                name="businessLicenseCode"
                value={user.businessLicenseCode || ''}
                onChange={handleInputChange}
              />
              {/* <Select
                options={workingAreaOptions}
                placeholder="Working area"
                value={selectedWorkingArea}
                onChange={setSelectedWorkingArea}
                isClearable 
              /> */}
              {/* <Select
                options={professionsList}
                placeholder="User profession"
                value={selectedProfession}
                onChange={setSelectedProfession}
                isClearable
              /> */}
            </>
          )}
          <input
            type="file"
            placeholder='Profile picture'
            onChange={handleFileChange}
          />
        </div>
        <Link to='/login'>
          <span>Already have an account?</span>
        </Link>
        <button onClick={handleRegisterClick} className='register-button'>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
