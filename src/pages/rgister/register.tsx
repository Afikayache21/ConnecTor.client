import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { register, IUser } from '../../services/AuthService';
import { useStore } from '../../Store/store';
import './registerDesktop.scss';
import { ISelectOption } from '../../Store/commonStore';

const Register: React.FC = () => {
  const { CommonStore } = useStore();
  const navigate = useNavigate();

  const [loadingProfessions, setLoadingProfessions] = useState(true);
  const [loadingRegions, setLoadingRegions] = useState(true);
  const [selectedProfessions, setSelectedProfessions] = useState<ISelectOption[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<{ value: number; label: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'customer' | 'constructor'>('customer');

  const [user, setUser] = useState<IUser>({});

  // Load professions and regions once on mount if not already loaded
  useEffect(() => {
    const loadOptions = async () => {
      if (!CommonStore.allProffesios.size) {
        setLoadingProfessions(true);
        await CommonStore.loadProffesions();
        setLoadingProfessions(false);
      } else {
        setLoadingProfessions(false);
      }

      if (!CommonStore.allRegions.size) {
        setLoadingRegions(true);
        await CommonStore.loadRegions();
        setLoadingRegions(false);
      } else {
        setLoadingRegions(false);
      }
    };
    loadOptions();
  }, [CommonStore]);
  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      professionIDs: selectedProfessions.map((option) => option.value),
    }));
  }, [selectedProfessions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  if (file) {
    setUser((prevUser) => ({ ...prevUser, userImage: file }));
  }
  };

  const handleRegisterClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(user.userPassword);
    console.log(user.email);
    console.log(user.firstName);
    console.log(user.lastName);
    console.log(user.telephone);
    console.log(user.professionIDs);


    if (!user.userPassword || !user.email || !user.firstName || !user.lastName || !user.telephone) {
      alert('Please fill in all required fields.');
      return;
    }
    activeTab == 'customer' ? user.userTypeID = 1 : user.userTypeID = 2;

    const userToRegister: IUser = {
      ...user,
      regionID: selectedRegion ? selectedRegion.value : user.regionID,
      professionIDs: selectedProfessions.map((option) => option.value),
    };
    console.log(userToRegister.professionIDs);

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
          onClick={() => {
            setActiveTab('customer')

          }}
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
          <input type="text" name="firstName" placeholder='First name' value={user.firstName} onChange={handleInputChange} />
          <input type="text" name="lastName" placeholder='Last name' value={user.lastName} onChange={handleInputChange} />
          <input type="email" name="email" placeholder='Email' value={user.email} onChange={handleInputChange} />
          <input type="password" name="userPassword" placeholder='Password' value={user.userPassword} onChange={handleInputChange} />
          <input type="text" name="telephone" placeholder='Phone number' value={user.telephone} onChange={handleInputChange} />

          {loadingRegions ? (
            <p>Loading regions...</p>
          ) : (
            <Select
              options={CommonStore.regions}
              placeholder="Select Region"
              value={selectedRegion}
              onChange={(selectedOption) => setSelectedRegion(selectedOption as { value: number; label: string })}
              isClearable
              styles={{
                option: (provided) => ({
                  ...provided,
                  color: 'black',
                }),
              }}
            />
          )}

          {loadingProfessions ? (
            <p>Loading professions...</p>
          ) : (
            activeTab === 'constructor' && (
              <>
                <Select
                  options={CommonStore.proffesions}
                  placeholder="Select Profession"
                  value={selectedProfessions}
                  onChange={(selectedOption) => setSelectedProfessions(selectedOption as { value: number; label: string }[])}
                  isClearable
                  isMulti
                  styles={{
                    option: (provided) => ({
                      ...provided,
                      color: 'black',
                    }),
                  }}
                />
                <input
                  type="text"
                  name="businessLicenseCode"
                  placeholder="Business License Code"
                  onChange={handleInputChange}
                />
              </>
            )
          )}
          <input type="file" placeholder='Profile picture' onChange={handleFileChange} />
        </div>
        <Link to='/login'><span>Already have an account?</span></Link>
        <button onClick={handleRegisterClick} className='register-button'>Register</button>
      </div>
    </div>
  );
};

export default Register;
